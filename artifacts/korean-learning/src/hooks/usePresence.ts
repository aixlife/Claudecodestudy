import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const SESSION_KEY = 'learner_session_id';

interface PresenceState {
  activeCount: number;
  isConnected: boolean;
}

export function usePresence(nickname: string, level: string): PresenceState {
  const [activeCount, setActiveCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !nickname) return;

    // 같은 탭 내 새로고침이면 기존 sessionId 재사용
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    const isNewSession = !sessionId;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    const id = sessionId;

    // 활성 학습자 수 조회 (last_seen 2분 이내)
    const fetchCount = async () => {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const { count } = await supabase!
        .from('learner_sessions')
        .select('*', { count: 'exact', head: true })
        .gte('last_seen', twoMinutesAgo);

      if (count !== null) setActiveCount(count);
    };

    // 새 세션이면 insert, 기존 세션이면 last_seen만 갱신
    const initSession = async () => {
      if (isNewSession) {
        const { error } = await supabase!
          .from('learner_sessions')
          .insert({ id, nickname, level, last_seen: new Date().toISOString() });
        if (!error) {
          setIsConnected(true);
          await fetchCount();
        }
      } else {
        // 새로고침: 기존 세션 갱신
        await supabase!
          .from('learner_sessions')
          .update({ last_seen: new Date().toISOString(), nickname, level })
          .eq('id', id);
        setIsConnected(true);
        await fetchCount();
      }
    };

    // heartbeat: 30초마다 last_seen 갱신
    const updateHeartbeat = async () => {
      await supabase!
        .from('learner_sessions')
        .update({ last_seen: new Date().toISOString() })
        .eq('id', id);
      await fetchCount();
    };

    initSession();
    const interval = setInterval(updateHeartbeat, 30000);

    // unmount 시 (화면 이동 등): sessionStorage는 유지, DB 삭제는 하지 않음
    // → TTL(2분) 방식으로 자동 만료
    return () => {
      clearInterval(interval);
    };
  }, [nickname, level]);

  return { activeCount, isConnected };
}

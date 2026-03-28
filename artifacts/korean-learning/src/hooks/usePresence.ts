import { useEffect, useState, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface PresenceState {
  activeCount: number;
  isConnected: boolean;
}

export function usePresence(nickname: string, level: string): PresenceState {
  const [activeCount, setActiveCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !nickname) return;

    const sessionId = crypto.randomUUID();
    sessionIdRef.current = sessionId;

    // 활성 학습자 수 조회 (last_seen 2분 이내)
    const fetchCount = async () => {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const { count } = await supabase!
        .from('learner_sessions')
        .select('*', { count: 'exact', head: true })
        .gte('last_seen', twoMinutesAgo);

      if (count !== null) {
        setActiveCount(count);
      }
    };

    // 세션 등록
    const insertSession = async () => {
      const { error } = await supabase!
        .from('learner_sessions')
        .insert({
          id: sessionId,
          nickname,
          level,
          last_seen: new Date().toISOString(),
        });

      if (!error) {
        setIsConnected(true);
        await fetchCount();
      }
    };

    // heartbeat: last_seen 갱신
    const updateHeartbeat = async () => {
      if (!sessionIdRef.current) return;
      await supabase!
        .from('learner_sessions')
        .update({ last_seen: new Date().toISOString() })
        .eq('id', sessionIdRef.current);
      await fetchCount();
    };

    // 세션 종료 시 삭제 (best-effort)
    const deleteSession = () => {
      if (!sessionIdRef.current) return;
      const id = sessionIdRef.current;
      sessionIdRef.current = null;
      // sendBeacon으로 페이지 이탈 시에도 요청 보장
      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/learner_sessions?id=eq.${id}`;
      const headers = {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      };
      // fetch 삭제 (unmount 시)
      fetch(url, { method: 'DELETE', headers }).catch(() => {});
    };

    insertSession();

    // 30초마다 heartbeat + 카운트 갱신
    const interval = setInterval(updateHeartbeat, 30000);

    // 탭 닫기/이탈 시 삭제
    window.addEventListener('beforeunload', deleteSession);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', deleteSession);
      deleteSession();
    };
  }, [nickname, level]);

  return { activeCount, isConnected };
}

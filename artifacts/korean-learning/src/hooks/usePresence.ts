import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const SESSION_KEY = 'learner_session_id';
const HEARTBEAT_INTERVAL = 30000; // 30초
const TTL_MINUTES = 2;
const CONNECTION_TIMEOUT = 10000; // 10초 후 연결 실패 간주

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

    // 연결 타임아웃: 10초 내 연결 안 되면 숨김 처리
    let connectionTimedOut = false;
    const timeoutTimer = setTimeout(() => {
      connectionTimedOut = true;
    }, CONNECTION_TIMEOUT);

    // 활성 학습자 수 조회 (TTL 기반)
    const fetchCount = async () => {
      try {
        const cutoff = new Date(Date.now() - TTL_MINUTES * 60 * 1000).toISOString();
        const { count, error } = await supabase!
          .from('learner_sessions')
          .select('*', { count: 'exact', head: true })
          .gte('last_seen', cutoff);

        if (!error && count !== null) setActiveCount(count);
      } catch {
        // 네트워크 에러 시 기존 count 유지
      }
    };

    // 만료 세션 정리 (5분 이상 된 레코드 삭제)
    const cleanupStale = async () => {
      try {
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        await supabase!
          .from('learner_sessions')
          .delete()
          .lt('last_seen', fiveMinAgo);
      } catch {
        // cleanup 실패해도 앱 동작에 영향 없음
      }
    };

    // 세션 등록 또는 갱신
    const initSession = async () => {
      try {
        if (isNewSession) {
          const { error } = await supabase!
            .from('learner_sessions')
            .insert({ id, nickname, level, last_seen: new Date().toISOString() });
          if (!error) {
            clearTimeout(timeoutTimer);
            setIsConnected(true);
            await fetchCount();
            await cleanupStale(); // 접속 시 stale 정리
          }
        } else {
          await supabase!
            .from('learner_sessions')
            .update({ last_seen: new Date().toISOString(), nickname, level })
            .eq('id', id);
          clearTimeout(timeoutTimer);
          setIsConnected(true);
          await fetchCount();
        }
      } catch {
        // Supabase 장애 시 학습 기능에는 영향 없음
      }
    };

    // heartbeat
    const updateHeartbeat = async () => {
      try {
        await supabase!
          .from('learner_sessions')
          .update({ last_seen: new Date().toISOString() })
          .eq('id', id);
        await fetchCount();
      } catch {
        // 실패해도 다음 heartbeat에서 재시도
      }
    };

    initSession();
    const interval = setInterval(updateHeartbeat, HEARTBEAT_INTERVAL);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutTimer);
    };
  }, [nickname, level]);

  return { activeCount, isConnected };
}

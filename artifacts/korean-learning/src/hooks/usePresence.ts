import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface PresenceState {
  activeCount: number;
  isConnected: boolean;
}

export function usePresence(nickname: string, level: string): PresenceState {
  const [activeCount, setActiveCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !nickname) return;

    const channel = supabase.channel('learners', {
      config: { presence: { key: nickname } },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setActiveCount(Object.keys(state).length);
        setIsConnected(true);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ nickname, level, joined_at: new Date().toISOString() });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [nickname, level]);

  return { activeCount, isConnected };
}

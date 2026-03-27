import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import CommunityLayout from './CommunityLayout';

interface Member {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  isVerified?: boolean | null;
  completedSteps?: string | null;
  verifiedAt?: string | null;
  joinedAt: string;
}

function displayName(m: Member) {
  const n = `${m.firstName || ''} ${m.lastName || ''}`.trim();
  return n || '익명 참여자';
}

function stepCount(completedSteps: string | null) {
  if (!completedSteps) return 0;
  try { return JSON.parse(completedSteps).length; } catch { return 0; }
}

export default function CommunityMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'verified'>('all');

  useEffect(() => {
    api.getMembers().then((d) => { setMembers(d.members || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'verified' ? members.filter((m) => m.isVerified) : members;
  const verifiedCount = members.filter((m) => m.isVerified).length;

  return (
    <CommunityLayout>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1A1714' }}>👥 참여자 목록</h1>
            <p style={{ fontSize: 13, color: '#9D9087', marginTop: 4 }}>총 {members.length}명 참여 중 · 인증 수료 {verifiedCount}명</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['all', 'verified'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: filter === f ? 700 : 500, background: filter === f ? '#D97757' : '#F5F0EB', color: filter === f ? 'white' : '#6B6560' }}>
                {f === 'all' ? '전체' : '🏅 인증 수료'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9D9087' }}>불러오는 중...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9D9087' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#4A3F35' }}>아직 인증 수료자가 없어요</div>
            <div style={{ fontSize: 14, marginTop: 8 }}>과제를 제출하고 첫 번째 수료자가 되어보세요!</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {filtered.map((m) => {
              const steps = stepCount(m.completedSteps);
              const pct = Math.round((steps / 20) * 100);
              return (
                <div key={m.id} style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, border: `1.5px solid ${m.isVerified ? '#D97757' : '#E8E0D6'}`, position: 'relative' }}>
                  {m.isVerified && (
                    <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 20 }}>🏅</div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    {m.profileImageUrl ? (
                      <img src={m.profileImageUrl} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F5F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                        👤
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1714' }}>{displayName(m)}</div>
                      {m.isVerified && <div style={{ fontSize: 11, color: '#D97757', fontWeight: 600 }}>인증 수료</div>}
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9D9087', marginBottom: 4 }}>
                      <span>진행률</span>
                      <span>{steps}/20 단계</span>
                    </div>
                    <div style={{ height: 6, background: '#F0EBE4', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: m.isVerified ? '#D97757' : '#4A8C6F', borderRadius: 3, width: `${pct}%`, transition: 'width 0.3s' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </CommunityLayout>
  );
}

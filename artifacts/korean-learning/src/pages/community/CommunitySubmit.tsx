import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { useAuth, displayName } from '../../hooks/useAuth';
import { useAppStore } from '../../store/useAppStore';
import CommunityLayout from './CommunityLayout';

const TOTAL_STEPS = 20;

interface Assignment {
  id: number;
  title: string;
  description: string;
  projectUrl?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string | null;
  submittedAt: string;
}

const statusLabel: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: '검토 중', color: '#B87D2B', bg: '#FEF9EE' },
  approved: { label: '✅ 수료 인증 완료', color: '#2D7D52', bg: '#E8F5EE' },
  rejected: { label: '❌ 반려됨', color: '#C0392B', bg: '#FDECEA' },
};

export default function CommunitySubmit() {
  const { user, login } = useAuth();
  const completedSteps = useAppStore((s) => s.completedSteps);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const progress = Math.round((completedSteps.length / TOTAL_STEPS) * 100);
  const isEligible = completedSteps.length >= 15;

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    api.getMyAssignments().then((d) => { setAssignments(d.assignments || []); setLoading(false); }).catch(() => setLoading(false));
  }, [user]);

  const syncProgress = async () => {
    if (!user) return;
    setSyncing(true);
    try { await api.syncProgress(completedSteps); } finally { setSyncing(false); }
  };

  const handleSubmit = async () => {
    if (!title || !description) return;
    setSubmitting(true);
    try {
      await api.submitAssignment({ title, description, projectUrl: projectUrl || undefined });
      const d = await api.getMyAssignments();
      setAssignments(d.assignments || []);
      setDone(true); setTitle(''); setDescription(''); setProjectUrl('');
    } finally { setSubmitting(false); }
  };

  return (
    <CommunityLayout>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1A1714', marginBottom: 8 }}>🎯 과제 제출</h1>
          <p style={{ fontSize: 14, color: '#6B6560', lineHeight: 1.7 }}>
            배운 내용을 실제로 적용한 프로젝트를 제출하세요. 검토 후 <strong>인증 수료 뱃지</strong>와 함께 커뮤니티 특별 혜택이 주어져요.
          </p>
        </div>

        {/* Progress sync */}
        {user && (
          <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, border: '1px solid #E8E0D6', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1714' }}>나의 학습 진행률</div>
              <button onClick={syncProgress} disabled={syncing}
                style={{ padding: '5px 14px', borderRadius: 16, background: '#F5F0EB', color: '#4A3F35', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                {syncing ? '동기화 중...' : '진행률 동기화'}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9D9087', marginBottom: 6 }}>
              <span>{completedSteps.length}/{TOTAL_STEPS} 단계 완료</span>
              <span>{progress}%</span>
            </div>
            <div style={{ height: 8, background: '#F0EBE4', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: isEligible ? '#D97757' : '#4A8C6F', borderRadius: 4, width: `${progress}%`, transition: 'width 0.4s' }} />
            </div>
            {!isEligible && (
              <div style={{ marginTop: 10, fontSize: 12, color: '#B87D2B', background: '#FEF9EE', padding: '8px 12px', borderRadius: 8 }}>
                💡 과제 제출은 15단계 이상 완료 후 가능해요 ({completedSteps.length}/15 단계)
              </div>
            )}
          </div>
        )}

        {/* Benefits info */}
        <div style={{ background: 'linear-gradient(135deg, #FCEEE7, #FAF9F6)', borderRadius: 16, padding: 20, border: '1px solid #F0E8DF', marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#D97757', marginBottom: 12 }}>🎁 인증 수료자 특별 혜택</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: '🏅', text: '인증 수료 뱃지 (커뮤니티 프로필 표시)' },
              { icon: '🔧', text: '전용 Claude Skills 템플릿 제공' },
              { icon: '👥', text: '수료자 전용 채널 접근 권한' },
              { icon: '🎁', text: '향후 고급 과정 우선 참여 기회' },
            ].map((b) => (
              <div key={b.text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#3A2E27' }}>
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Past submissions */}
        {user && assignments.length > 0 && (
          <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, border: '1px solid #E8E0D6', marginBottom: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1714', marginBottom: 12 }}>제출 내역</div>
            {assignments.map((a) => {
              const s = statusLabel[a.status];
              return (
                <div key={a.id} style={{ padding: '12px 0', borderBottom: '1px solid #F5F0EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1714' }}>{a.title}</span>
                    <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 12, background: s.bg, color: s.color, fontWeight: 700 }}>{s.label}</span>
                  </div>
                  {a.adminNote && <div style={{ fontSize: 12, color: '#6B6560', marginTop: 4 }}>메모: {a.adminNote}</div>}
                </div>
              );
            })}
          </div>
        )}

        {/* Form */}
        {!user ? (
          <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 40, border: '1px solid #E8E0D6', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1714', marginBottom: 8 }}>로그인이 필요해요</div>
            <div style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>과제 제출을 위해 로그인해주세요</div>
            <button onClick={login}
              style={{ padding: '12px 32px', borderRadius: 24, background: '#D97757', color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
              구글로 간편 로그인
            </button>
          </div>
        ) : done ? (
          <div style={{ background: '#E8F5EE', borderRadius: 16, padding: 40, border: '1px solid #B8DECE', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1A1714', marginBottom: 8 }}>과제가 제출됐어요!</div>
            <div style={{ fontSize: 14, color: '#2D7D52', lineHeight: 1.7 }}>운영팀이 검토 후 인증 수료 뱃지를 드릴게요. 보통 2~3일 이내에 처리돼요.</div>
            <button onClick={() => setDone(false)} style={{ marginTop: 20, padding: '8px 24px', borderRadius: 20, background: 'white', color: '#2D7D52', fontWeight: 600, fontSize: 14, cursor: 'pointer', border: '1.5px solid #2D7D52', fontFamily: 'inherit' }}>
              추가 제출하기
            </button>
          </div>
        ) : (
          <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E8E0D6' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1714', marginBottom: 16 }}>과제 제출하기</div>
            {!isEligible && (
              <div style={{ padding: '12px', borderRadius: 10, background: '#FEF9EE', border: '1px solid #F5D5A0', marginBottom: 16, fontSize: 13, color: '#B87D2B' }}>
                ⚠️ 15단계 이상 완료 후 과제를 제출할 수 있어요. 현재 {completedSteps.length}단계 완료했어요.
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#4A3F35', display: 'block', marginBottom: 6 }}>프로젝트 제목 *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예) Claude Code로 만든 자동화 뉴스레터 봇"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E8E0D6', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#4A3F35', display: 'block', marginBottom: 6 }}>프로젝트 설명 *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6}
                placeholder="어떤 프로젝트를 만들었나요? 어떤 클로드 코드 기술을 적용했나요? 무엇을 배웠나요?"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E8E0D6', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#4A3F35', display: 'block', marginBottom: 6 }}>프로젝트 URL (선택)</label>
              <input value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} placeholder="GitHub, 배포 URL 등"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E8E0D6', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button onClick={handleSubmit} disabled={submitting || !isEligible || !title || !description}
              style={{ width: '100%', padding: '14px', borderRadius: 24, background: (!isEligible || !title || !description) ? '#D4C9BB' : '#D97757', color: 'white', fontWeight: 700, fontSize: 15, cursor: (!isEligible || !title || !description) ? 'not-allowed' : 'pointer', border: 'none', fontFamily: 'inherit' }}>
              {submitting ? '제출 중...' : '🎯 과제 제출하기'}
            </button>
          </div>
        )}
      </div>
    </CommunityLayout>
  );
}

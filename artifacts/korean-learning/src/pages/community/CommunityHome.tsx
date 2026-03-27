import { Link } from 'wouter';
import { useAuth, displayName } from '../../hooks/useAuth';
import CommunityLayout from './CommunityLayout';

const boards = [
  { path: '/community/board/discussion', icon: '💬', title: '커뮤니티 방', desc: '자유롭게 소통하고 경험을 나눠요' },
  { path: '/community/board/notice', icon: '📢', title: '공지사항', desc: '중요한 소식과 업데이트를 확인해요' },
  { path: '/community/board/tools', icon: '🔧', title: '도구 모음', desc: 'Claude Skills, MCP, GitHub 등 유용한 도구 모음' },
  { path: '/community/board/qa', icon: '❓', title: 'Q&A', desc: '막히는 것들을 질문하고 답변받아요' },
];

export default function CommunityHome() {
  const { user, isLoading, login } = useAuth();

  return (
    <CommunityLayout>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #FCEEE7 0%, #FAF9F6 100%)', borderRadius: 20, padding: '40px 32px', marginBottom: 32, border: '1px solid #F0E8DF' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#D97757', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Claude Code 마스터 클래스</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1A1714', marginBottom: 12, lineHeight: 1.3 }}>함께 배우고, 함께 성장해요</h1>
            <p style={{ fontSize: 15, color: '#6B6560', lineHeight: 1.7, maxWidth: 480 }}>
              이 커뮤니티는 직접 실행한 사람들의 공간이에요. 과제를 제출하면 인증 수료 뱃지와 함께 특별한 혜택이 주어져요.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              {!isLoading && !user && (
                <button onClick={login} style={{ padding: '10px 24px', borderRadius: 24, background: '#D97757', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                  구글로 간편 로그인 →
                </button>
              )}
              {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 24, background: '#FFFFFF', border: '1px solid #E8E0D6' }}>
                  <span style={{ fontSize: 18 }}>👋</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1714' }}>{displayName(user)}님, 반가워요!</span>
                </div>
              )}
              <Link href="/community/submit"
                style={{ padding: '10px 24px', borderRadius: 24, background: '#FFFFFF', border: '1.5px solid #D97757', color: '#D97757', fontWeight: 700, fontSize: 14, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                🎯 과제 제출하기
              </Link>
            </div>
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '20px 24px', border: '1px solid #E8E0D6', minWidth: 200, flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9D9087', marginBottom: 16, letterSpacing: '0.06em' }}>인증 수료자 혜택</div>
            {['🏅 인증 수료 뱃지', '🔧 전용 도구/템플릿', '👥 수료자 전용 채널', '🎁 향후 업데이트 우선 접근'].map((b) => (
              <div key={b} style={{ fontSize: 13, color: '#3A2E27', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Boards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
        {boards.map((b) => (
          <Link key={b.path} href={b.path}
            style={{ textDecoration: 'none', background: '#FFFFFF', borderRadius: 16, padding: '24px', border: '1px solid #E8E0D6', display: 'block', transition: 'all 0.15s' }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.borderColor = '#D97757'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(217,119,87,0.12)'; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.borderColor = '#E8E0D6'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{b.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1714', marginBottom: 6 }}>{b.title}</div>
            <div style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.5 }}>{b.desc}</div>
          </Link>
        ))}
      </div>

      {/* Members teaser */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '24px', border: '1px solid #E8E0D6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1714', marginBottom: 4 }}>👥 함께 하는 사람들</div>
          <div style={{ fontSize: 13, color: '#6B6560' }}>이 과정을 함께 하고 있는 참여자들을 만나보세요</div>
        </div>
        <Link href="/community/members"
          style={{ padding: '8px 20px', borderRadius: 20, background: '#F5F0EB', color: '#4A3F35', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
          참여자 보기 →
        </Link>
      </div>
    </CommunityLayout>
  );
}

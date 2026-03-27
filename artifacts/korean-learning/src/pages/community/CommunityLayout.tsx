import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth, displayName } from '../../hooks/useAuth';

const navItems = [
  { path: '/community', label: '홈', icon: '🏠', exact: true },
  { path: '/community/board/discussion', label: '커뮤니티', icon: '💬' },
  { path: '/community/board/notice', label: '공지사항', icon: '📢' },
  { path: '/community/board/tools', label: '도구 모음', icon: '🔧' },
  { path: '/community/board/qa', label: 'Q&A', icon: '❓' },
  { path: '/community/members', label: '참여자', icon: '👥' },
  { path: '/community/submit', label: '과제 제출', icon: '🎯' },
];

export default function CommunityLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user, isLoading, login, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#FAF9F6', fontFamily: 'Pretendard, sans-serif' }}>
      {/* Top nav */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E0D6', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', height: 56, gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#D97757', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 13 }}>C</div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1714' }}>Claude Code</span>
          </Link>

          <div style={{ display: 'flex', gap: 4, flex: 1, overflow: 'hidden' }}>
            {navItems.map((item) => {
              const active = item.exact ? location === item.path : location.startsWith(item.path);
              return (
                <Link key={item.path} href={item.path}
                  style={{
                    textDecoration: 'none', padding: '5px 10px', borderRadius: 20,
                    fontSize: 13, fontWeight: active ? 700 : 500, whiteSpace: 'nowrap',
                    background: active ? '#FCEEE7' : 'transparent',
                    color: active ? '#D97757' : '#6B6560',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {isLoading ? (
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F0EBE4' }} />
            ) : user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {user.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#D97757', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700 }}>
                    {displayName(user).charAt(0)}
                  </div>
                )}
                <span style={{ fontSize: 12, color: '#6B6560', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName(user)}</span>
                <button onClick={logout} style={{ fontSize: 11, color: '#9D9087', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit' }}>로그아웃</button>
              </div>
            ) : (
              <button onClick={login}
                style={{ padding: '6px 16px', borderRadius: 20, background: '#D97757', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                로그인
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
        {children}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { api } from '../../lib/api';
import { useAuth, displayName } from '../../hooks/useAuth';
import CommunityLayout from './CommunityLayout';

const boardMeta: Record<string, { icon: string; title: string; desc: string; canWrite: boolean; isTools?: boolean }> = {
  discussion: { icon: '💬', title: '커뮤니티 방', desc: '자유롭게 대화하세요', canWrite: true },
  notice: { icon: '📢', title: '공지사항', desc: '운영진의 공지를 확인하세요', canWrite: false },
  tools: { icon: '🔧', title: '도구 모음', desc: 'Claude Skills, MCP, GitHub 등 유용한 자료', canWrite: false, isTools: true },
  qa: { icon: '❓', title: 'Q&A', desc: '질문하고 답변을 받으세요', canWrite: true },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return '방금';
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
}

interface Post {
  id: number;
  title: string;
  content: string;
  isPinned: boolean;
  isAnonymous: boolean;
  viewCount: number;
  likeCount: number;
  externalUrl?: string | null;
  createdAt: string;
  authorId: string;
  authorFirstName?: string | null;
  authorLastName?: string | null;
  authorProfileImage?: string | null;
}

export default function CommunityBoard() {
  const [location] = useLocation();
  const boardType = location.split('/').pop() || 'discussion';
  const meta = boardMeta[boardType] || boardMeta.discussion;

  const { user, login } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<Post | null>(null);
  const [comments, setComments] = useState<{id:number;content:string;isAnonymous:boolean;createdAt:string;authorId:string;authorFirstName?:string|null;authorLastName?:string|null}[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setLoading(true);
    setSelected(null);
    api.getPosts(boardType).then((d) => { setPosts(d.posts || []); setLoading(false); }).catch(() => setLoading(false));
  }, [boardType]);

  const openPost = async (post: Post) => {
    setSelected(post);
    const d = await api.getPost(boardType, post.id);
    setSelected(d.post);
    setComments(d.comments || []);
    setIsLiked(d.isLiked || false);
  };

  const handleSubmit = async () => {
    if (!title || !content) return;
    setSubmitting(true);
    try {
      await api.createPost({ boardType, title, content, isAnonymous, externalUrl: externalUrl || undefined });
      const d = await api.getPosts(boardType);
      setPosts(d.posts || []);
      setShowForm(false); setTitle(''); setContent(''); setExternalUrl('');
    } finally { setSubmitting(false); }
  };

  const handleComment = async () => {
    if (!commentText || !selected) return;
    await api.createComment(selected.id, { content: commentText, isAnonymous });
    const d = await api.getPost(boardType, selected.id);
    setComments(d.comments || []);
    setCommentText('');
  };

  const handleLike = async () => {
    if (!selected) return;
    const d = await api.toggleLike(selected.id);
    setIsLiked(d.liked);
    setSelected((p) => p ? { ...p, likeCount: p.likeCount + (d.liked ? 1 : -1) } : p);
  };

  const authorName = (p: { isAnonymous: boolean; authorFirstName?: string | null; authorLastName?: string | null }) => {
    if (p.isAnonymous) return '익명';
    const n = `${p.authorFirstName || ''} ${p.authorLastName || ''}`.trim();
    return n || '사용자';
  };

  return (
    <CommunityLayout>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1A1714', display: 'flex', alignItems: 'center', gap: 8 }}>
                {meta.icon} {meta.title}
              </h1>
              <p style={{ fontSize: 13, color: '#9D9087', marginTop: 4 }}>{meta.desc}</p>
            </div>
            {meta.canWrite && (
              user ? (
                <button onClick={() => setShowForm(!showForm)}
                  style={{ padding: '8px 20px', borderRadius: 20, background: '#D97757', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                  + 글쓰기
                </button>
              ) : (
                <button onClick={login}
                  style={{ padding: '8px 20px', borderRadius: 20, background: '#F5F0EB', color: '#4A3F35', fontWeight: 600, fontSize: 13, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                  로그인 후 글쓰기
                </button>
              )
            )}
          </div>

          {/* Write form */}
          {showForm && (
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E8E0D6', marginBottom: 20 }}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E8E0D6', marginBottom: 12, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 작성해주세요" rows={5}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E8E0D6', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: 12 }} />
              {meta.isTools && (
                <input value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="관련 URL (선택)"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E8E0D6', marginBottom: 12, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B6560', cursor: 'pointer' }}>
                  <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                  익명으로 게시
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setShowForm(false)} style={{ padding: '8px 16px', borderRadius: 20, background: '#F5F0EB', color: '#6B6560', fontSize: 13, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>취소</button>
                  <button onClick={handleSubmit} disabled={submitting}
                    style={{ padding: '8px 20px', borderRadius: 20, background: '#D97757', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                    {submitting ? '게시 중...' : '게시하기'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Post list or detail */}
          {selected ? (
            <div>
              <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6B6560', fontSize: 13, cursor: 'pointer', marginBottom: 16, fontFamily: 'inherit' }}>
                ← 목록으로
              </button>
              <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E8E0D6', marginBottom: 16 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1A1714', marginBottom: 8 }}>{selected.title}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#9D9087', marginBottom: 20 }}>
                  <span>{authorName(selected)}</span>
                  <span>·</span>
                  <span>{timeAgo(selected.createdAt)}</span>
                  <span>·</span>
                  <span>조회 {selected.viewCount}</span>
                </div>
                <div style={{ fontSize: 15, color: '#3A2E27', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.content}</div>
                {selected.externalUrl && (
                  <a href={selected.externalUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-block', marginTop: 16, padding: '8px 16px', borderRadius: 20, background: '#F5F0EB', color: '#D97757', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                    🔗 바로가기
                  </a>
                )}
                <div style={{ display: 'flex', gap: 12, marginTop: 20, paddingTop: 16, borderTop: '1px solid #F0EBE4' }}>
                  <button onClick={handleLike}
                    style={{ padding: '6px 16px', borderRadius: 20, border: `1.5px solid ${isLiked ? '#D97757' : '#E8E0D6'}`, background: isLiked ? '#FCEEE7' : 'transparent', color: isLiked ? '#D97757' : '#6B6560', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {isLiked ? '❤️' : '🤍'} {selected.likeCount}
                  </button>
                </div>
              </div>

              {/* Comments */}
              <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E8E0D6' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1714', marginBottom: 16 }}>댓글 {comments.length}</div>
                {comments.map((c) => (
                  <div key={c.id} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid #F5F0EB' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#4A3F35' }}>{authorName(c)}</span>
                      <span style={{ fontSize: 12, color: '#9D9087' }}>{timeAgo(c.createdAt)}</span>
                    </div>
                    <div style={{ fontSize: 14, color: '#3A2E27', lineHeight: 1.6 }}>{c.content}</div>
                  </div>
                ))}
                {user ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="댓글을 입력해주세요"
                      style={{ flex: 1, padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E8E0D6', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleComment())} />
                    <button onClick={handleComment} style={{ padding: '8px 16px', borderRadius: 10, background: '#D97757', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', border: 'none', fontFamily: 'inherit', flexShrink: 0 }}>게시</button>
                  </div>
                ) : (
                  <button onClick={login} style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#F5F0EB', color: '#6B6560', fontSize: 13, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                    로그인하고 댓글 달기
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#9D9087' }}>불러오는 중...</div>
              ) : posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#9D9087' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#4A3F35' }}>아직 글이 없어요</div>
                  <div style={{ fontSize: 14 }}>첫 번째 글을 남겨주세요!</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {posts.map((p) => (
                    <button key={p.id} onClick={() => openPost(p)}
                      style={{ background: '#FFFFFF', borderRadius: 12, padding: '16px 20px', border: `1px solid ${p.isPinned ? '#D97757' : '#E8E0D6'}`, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {p.isPinned && <span style={{ fontSize: 11, background: '#D97757', color: 'white', padding: '1px 8px', borderRadius: 10, fontWeight: 700 }}>공지</span>}
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1714', flex: 1 }}>{p.title}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#9D9087' }}>
                        <span>{authorName(p)}</span>
                        <span>·</span>
                        <span>{timeAgo(p.createdAt)}</span>
                        <span>·</span>
                        <span>👁 {p.viewCount}</span>
                        <span>❤️ {p.likeCount}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const API = `${BASE}/api`;

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'API error');
  }
  return res.json();
}

export const api = {
  getUser: () => apiFetch('/auth/user'),
  getMembers: () => apiFetch('/community/members'),
  getPosts: (board: string) => apiFetch(`/community/posts/${board}`),
  getPost: (board: string, id: number) => apiFetch(`/community/posts/${board}/${id}`),
  createPost: (data: object) => apiFetch('/community/posts', { method: 'POST', body: JSON.stringify(data) }),
  createComment: (postId: number, data: object) => apiFetch(`/community/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify(data) }),
  toggleLike: (postId: number) => apiFetch(`/community/posts/${postId}/like`, { method: 'POST' }),
  getMyAssignments: () => apiFetch('/community/assignments/my'),
  submitAssignment: (data: object) => apiFetch('/community/assignments', { method: 'POST', body: JSON.stringify(data) }),
  syncProgress: (completedSteps: string[]) => apiFetch('/community/sync-progress', { method: 'POST', body: JSON.stringify({ completedSteps }) }),
};

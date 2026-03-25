import { writable, derived } from 'svelte/store';

const TOKEN_KEY = 'admin_token';

function createAuthStore() {
  const { subscribe, set, update } = writable(
    typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
  );

  return {
    subscribe,
    login(token) {
      localStorage.setItem(TOKEN_KEY, token);
      set(token);
    },
    logout() {
      localStorage.removeItem(TOKEN_KEY);
      set(null);
    }
  };
}

export const token = createAuthStore();
export const isAuthenticated = derived(token, $t => !!$t);

/** Empty = same-origin (/api → Vite proxy in dev, Nginx in prod). Set full URL only if API is on another host. */
export const API_BASE =
  import.meta.env.VITE_API_URL != null && String(import.meta.env.VITE_API_URL).length > 0
    ? import.meta.env.VITE_API_URL
    : '';

export async function apiFetch(path, opts = {}) {
  let t;
  token.subscribe(v => t = v)();
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
      ...(opts.headers || {})
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  if (!res.ok) {
    if (res.status === 401) {
      // Expired or invalid token — clear it so the login form is shown
      token.logout();
    }
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'API error');
  }
  return res.json();
}

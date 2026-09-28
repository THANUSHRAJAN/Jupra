const TOKEN_KEY = 'jupra_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/** Decodes a JWT payload client-side (no signature check — just for UI/expiry convenience). */
export function decodeToken(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function isTokenValid(token) {
  const claims = decodeToken(token);
  if (!claims || !claims.exp) return false;
  return claims.exp * 1000 > Date.now();
}

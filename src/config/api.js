import { getToken } from '../utils/auth';

/**
 * Base URL of the JUPRA Spring Boot backend (set VITE_API_BASE_URL in .env, e.g.
 * https://jupra-backend.onrender.com). Empty when not configured — the public
 * Contact form/chatbot then fall back to their previous behaviour (see utils/submit.js).
 */
export const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

/**
 * Small fetch wrapper for the admin API: attaches the founder's JWT (unless auth:false),
 * JSON-encodes the body, and throws a plain Error with the backend's message on failure.
 */
export async function apiRequest(path, { method = 'GET', body, auth = true, signal } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* no JSON body */
  }

  if (!res.ok) {
    throw new Error((data && data.message) || `Request failed (${res.status}).`);
  }
  return data;
}

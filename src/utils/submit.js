import { site, mailtoHref } from '../config/site';
import { API_BASE } from '../config/api';

/**
 * Sends an enquiry (contact form or chatbot).
 *  • If VITE_API_BASE_URL is set → POSTs to the JUPRA backend, which stores it in the database
 *    (this is what powers the founder dashboard at /founderofjupra).
 *  • Else if VITE_FORM_ENDPOINT is set → POSTs to that third-party form endpoint instead.
 *  • Otherwise → opens the visitor's email app pre-filled (mailto fallback).
 * Returns { mode: 'backend' | 'endpoint' | 'mailto' }
 */
export async function submitEnquiry(data) {
  const {
    name = '', email = '', phone = '', organization = '',
    requirementType = '', message = '', file = null, source = 'Website',
  } = data;

  if (API_BASE) {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('phone', phone);
    fd.append('organization', organization);
    fd.append('requirementType', requirementType);
    fd.append('message', message);
    fd.append('source', source);
    if (file) fd.append('attachment', file);

    let res;
    try {
      res = await fetch(`${API_BASE}/api/contact`, { method: 'POST', body: fd });
    } catch {
      throw new Error('Could not reach the server. Please check your connection and try again.');
    }
    let payload = null;
    try { payload = await res.json(); } catch { /* no body */ }
    if (!res.ok) throw new Error((payload && payload.message) || `Request failed (${res.status})`);
    return { mode: 'backend' };
  }

  const endpoint = site.form.endpoint;

  if (endpoint) {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('phone', phone);
    fd.append('organization', organization);
    fd.append('requirement_type', requirementType);
    fd.append('message', message);
    fd.append('source', source);
    fd.append('_subject', `New JUPRA enquiry — ${requirementType || 'General'} — ${name}`);
    if (file) fd.append('attachment', file);

    const res = await fetch(endpoint, {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return { mode: 'endpoint' };
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Organization: ${organization}`,
    `Requirement type: ${requirementType}`,
    `Source: ${source}`,
    '',
    message,
    file ? `\n(Attachment to add manually: ${file.name})` : '',
  ].join('\n');

  window.location.href = mailtoHref(`New JUPRA enquiry — ${requirementType || 'General'}`, body);
  return { mode: 'mailto' };
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
export const isPhone = (v) => v.replace(/[^\d]/g, '').length >= 8;

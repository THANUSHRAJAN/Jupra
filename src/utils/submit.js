import { site, mailtoHref } from '../config/site';

/**
 * Sends an enquiry (contact form or chatbot).
 *  • If VITE_FORM_ENDPOINT is set → POSTs to it (supports file upload).
 *  • Otherwise → opens the visitor's email app pre-filled (mailto fallback).
 * Returns { mode: 'endpoint' | 'mailto' }
 */
export async function submitEnquiry(data) {
  const {
    name = '', email = '', phone = '', organization = '',
    requirementType = '', message = '', file = null, source = 'Website',
  } = data;

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

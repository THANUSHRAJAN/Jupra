/**
 * ═══════════════════════════════════════════════════════════════════
 *  JUPRA — SINGLE SOURCE OF TRUTH
 *  Every contact detail, link and brand text used across the website
 *  lives in this file. Update a value here and it changes everywhere
 *  (navbar, footer, contact page, chatbot, floating buttons, etc).
 *
 *  Leave a value as "" and the website shows a tidy
 *  "coming soon / to be updated" state instead of a broken link.
 * ═══════════════════════════════════════════════════════════════════
 */

const phoneRaw = '919884290472'; // country code + number, digits only

export const site = {
  name: 'JUPRA',
  tagline: 'Innovate · Build · Grow',
  footerTagline: 'Innovating Technology. Solving Real Problems.',
  footerAreas: ['AI', 'IoT', 'Smart Hardware', 'Automation', 'Digital Solutions'],

  /* ─────────────  CONTACT DETAILS  ───────────── */
  contact: {
    email: 'jpra4425@gail.com', // ← as provided. If this should be Gmail, change to jpra4425@gmail.com
    phoneDisplay: '+91 98842 90472',
    phoneHref: `tel:+${phoneRaw}`,
    whatsappHref: `https://wa.me/${phoneRaw}?text=${encodeURIComponent(
      'Hello JUPRA team, I would like to discuss a technology solution.'
    )}`,
    location: '', // e.g. 'Chennai, Tamil Nadu, India'
  },

  /* ─────────────  SOCIAL LINKS  (paste full URLs later)  ───────────── */
  social: {
    linkedin: '', // e.g. 'https://www.linkedin.com/company/jupra'
    instagram: '', // e.g. 'https://www.instagram.com/jupra'
    youtube: '', // e.g. 'https://www.youtube.com/@jupra'
  },

  /* ─────────────  FORMS  ───────────── */
  form: {
    // Set VITE_FORM_ENDPOINT in .env (see .env.example)
    endpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
    maxFileMB: 10,
  },

  /* ─────────────  FOUNDER  (replace when ready)  ───────────── */
  founder: {
    name: 'Founder Name',
    title: 'Founder & CEO',
    photo: '', // e.g. import a photo into src/assets and set the path, or use a URL
    linkedin: '',
    bio: [
      'A technologist and builder who believes the best technology begins with a real problem, not a feature list. JUPRA was founded to bring AI, IoT and intelligent hardware out of the lab and into everyday life.',
      'Leading a team of engineers and designers, the focus is simple: understand the problem deeply, build practical solutions, and keep improving until they truly work for the people who use them.',
    ],
  },
};

/** Helper: is a link filled in? */
export const hasLink = (value) => typeof value === 'string' && value.trim().length > 0;

export const mailtoHref = (subject = '', body = '') => {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.contact.email}${params.length ? `?${params.join('&')}` : ''}`;
};

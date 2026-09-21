# JUPRA — Official Website (React + Vite)

Premium, white-theme, fully responsive, animated website for **JUPRA**
*(Innovate · Build · Grow)* — built exactly to the structure in `website.docx`.

**Pages:** Home · Products · About Us · Founder / Team · Contact Us · Get Started (with chatbot) · Privacy Policy · Terms & Conditions · Cookie Policy · 404

**Stack:** React 18 · Vite 5 · React Router 6 · Framer Motion · Lucide icons · self-hosted fonts (Outfit + Inter)

---

## 1. Run it

Requires **Node.js 18+**.

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build      # outputs /dist
npm run preview    # test the build locally
```

## 2. Where to put your details later  ← the important part

Everything lives in **`src/config/site.js`**. Change a value once → it updates everywhere
(navbar, footer, contact page, chatbot, floating buttons).

| What                         | Where in `src/config/site.js`            |
| ---------------------------- | ---------------------------------------- |
| Email                        | `contact.email`                          |
| Phone / WhatsApp             | `contact.phoneDisplay`, `phoneHref`, `whatsappHref`, `phoneRaw` (top of file) |
| Location                     | `contact.location`                       |
| LinkedIn / Instagram / YouTube | `social.linkedin`, `social.instagram`, `social.youtube` |
| Founder name, photo, bio     | `founder.*`                              |

Empty links/location automatically show a tidy *"Link coming soon / To be updated"* state
(no broken links). Just paste the full URL and it becomes live.

Other content is in **`src/data/content.js`**:
products (name, image, benefits, specs), team members (name, photo, LinkedIn),
services, beliefs, menu and footer links.

- **Product image:** `image: '/my-product.png'` (put the file in `public/`).
- **Team photo:** `photo: '/team/name.jpg'`.

## 3. Make the forms deliver enquiries

The Contact form and the chatbot both use one function (`src/utils/submit.js`).

1. Create a free form endpoint (Formspree, Getform, Basin, Web3Forms, or your own API).
2. Copy `.env.example` → `.env` and set `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx`.
3. Restart. Enquiries (including the uploaded file) are now POSTed to your endpoint.

Until an endpoint is set, the site falls back to opening the visitor's email app with the
enquiry pre-filled (`mailto:`), so nothing breaks. *(File attachments require an endpoint that
supports uploads — check your provider's plan.)*

## 4. Logo

The logo was **vector-traced from your PNG** (`src/assets/jupra-mark.svg`, `jupra-wordmark.svg`),
so it stays crisp at any size. The original is kept in `src/assets/logo-original.png`.
Brand colours: Blue `#0A2FC0`, Pink `#F754A2` (CSS variables at the top of `src/styles/global.css`).
If you later get the original vector logo (AI/SVG), simply replace the two SVG files.

## 5. Deploy

`dist/` is a static site. Works on Netlify (`public/_redirects` included), Vercel
(`vercel.json` included), Cloudflare Pages, GitHub Pages, or any static host —
just make sure all routes fall back to `index.html`.

## 6. Project structure

```
src/
  config/site.js        ← contact details, links, form endpoint, founder
  data/content.js       ← all page content (products, team, services…)
  components/           ← Navbar, Footer, Logo, ChatBot, ContactForm, animations…
  pages/                ← Home, Products, About, Team, Contact, GetStarted, Legal
  styles/global.css     ← full design system (tokens, components, responsive)
  utils/submit.js       ← form / chatbot submission logic
  assets/               ← logo files
```

## 7. Notes

- The Privacy / Terms / Cookie pages contain **starter text** — please have them reviewed
  by a legal professional before launch.
- Descriptive copy (About, Mission, Vision, founder bio, product placeholders) is
  draft text written from your document's outline — replace it with your own wording.

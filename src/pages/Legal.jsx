import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { site } from '../config/site';

const pages = {
  privacy: {
    crumb: 'Privacy Policy',
    title: 'Privacy Policy',
    intro: `This policy explains how ${site.name} collects, uses and protects information you share through this website.`,
    sections: [
      ['Information we collect', 'When you submit the contact form or use our chat assistant, we collect the details you provide — such as your name, email, phone number, organisation, requirement details and any file you attach.'],
      ['How we use it', 'We use this information only to respond to your enquiry, understand your requirement and communicate with you about possible solutions.'],
      ['Sharing', 'We do not sell your personal information. We may use trusted service providers (for example, form or email delivery services) strictly to operate this website and handle your enquiry.'],
      ['Data retention & security', 'We keep enquiry details only as long as needed for the purpose above and take reasonable steps to protect them.'],
      ['Your rights', `You may ask us to access, correct or delete the information you have shared by contacting us at ${site.contact.email}.`],
    ],
  },
  terms: {
    crumb: 'Terms & Conditions',
    title: 'Terms & Conditions',
    intro: `By using this website you agree to the following terms. Please read them carefully.`,
    sections: [
      ['Use of this website', `The content on this website is provided for general information about ${site.name} and its products and services. You agree to use it lawfully and not to misuse or disrupt it.`],
      ['Products & information', 'Products and features shown on this website may be under development and are subject to change without notice. Nothing here constitutes a binding offer.'],
      ['Intellectual property', `All logos, text, graphics and designs on this website belong to ${site.name} unless stated otherwise and may not be copied or reused without written permission.`],
      ['Limitation of liability', 'We make reasonable efforts to keep the website accurate and available, but provide it “as is” without warranties of any kind.'],
      ['Contact', `Questions about these terms can be sent to ${site.contact.email}.`],
    ],
  },
  cookies: {
    crumb: 'Cookie Policy',
    title: 'Cookie Policy',
    intro: 'This policy explains how cookies and similar technologies may be used on this website.',
    sections: [
      ['What are cookies', 'Cookies are small text files stored on your device that help websites work properly and understand how they are used.'],
      ['How we use them', 'This website is designed to run without tracking cookies. If we add analytics or marketing tools in future, we will update this policy and, where required, ask for your consent.'],
      ['Managing cookies', 'You can control or delete cookies at any time through your browser settings.'],
      ['Contact', `For any questions, contact us at ${site.contact.email}.`],
    ],
  },
};

export default function Legal({ type }) {
  const p = pages[type];
  return (
    <>
      <PageHero crumb={p.crumb} eyebrow="Legal" title={p.title} lede={p.intro} />
      <section className="section section--tight">
        <div className="container container--narrow">
          {p.sections.map(([h, t], i) => (
            <Reveal key={h} delay={i * 0.04} className="legal">
              <h2>{h}</h2>
              <p>{t}</p>
            </Reveal>
          ))}
          <p className="legal__date">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>
    </>
  );
}

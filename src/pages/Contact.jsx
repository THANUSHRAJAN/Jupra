import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';
import Reveal from '../components/Reveal';
import { site, hasLink, mailtoHref } from '../config/site';

function InfoRow({ icon: Icon, label, value, href, external, pending }) {
  const inner = (
    <>
      <span className="info__ico"><Icon size={20} strokeWidth={1.8} /></span>
      <span className="info__txt">
        <small>{label}</small>
        <strong className={pending ? 'is-pending' : ''}>{value}</strong>
      </span>
      {href && <ArrowUpRight size={18} className="info__go" />}
    </>
  );
  return href ? (
    <a className="info" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
  ) : (
    <div className="info info--static">{inner}</div>
  );
}

export default function Contact() {
  const { contact, social } = site;
  return (
    <>
      <PageHero
        crumb="Contact Us"
        eyebrow="Contact Us"
        title={<>Let&apos;s Work <span className="text-grad">Together</span></>}
        lede="Have a problem that needs a technology solution? Tell us about it."
      />

      <section className="section section--tight">
        <div className="container contact">
          <Reveal className="contact__form">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12} className="contact__side">
            <div className="side-card">
              <h2>Contact Information</h2>
              <p className="side-card__sub">Reach out directly — we would love to hear from you.</p>

              <div className="info-list">
                <InfoRow icon={Mail} label="Email" value={contact.email} href={mailtoHref()} />
                <InfoRow icon={Phone} label="Phone" value={contact.phoneDisplay} href={contact.phoneHref} />
                <InfoRow
                  icon={MapPin}
                  label="Location"
                  value={contact.location || 'To be updated soon'}
                  pending={!contact.location}
                />
                <InfoRow
                  icon={Linkedin}
                  label="LinkedIn"
                  value={hasLink(social.linkedin) ? 'Connect with us' : 'Link coming soon'}
                  href={hasLink(social.linkedin) ? social.linkedin : undefined}
                  external
                  pending={!hasLink(social.linkedin)}
                />
                <InfoRow
                  icon={Instagram}
                  label="Instagram"
                  value={hasLink(social.instagram) ? 'Follow us' : 'Link coming soon'}
                  href={hasLink(social.instagram) ? social.instagram : undefined}
                  external
                  pending={!hasLink(social.instagram)}
                />
              </div>
            </div>

            <a className="wa-card" href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
              <span className="wa-card__ico"><MessageCircle size={24} /></span>
              <span>
                <strong>Prefer WhatsApp?</strong>
                <small>Chat with our team directly</small>
              </span>
              <ArrowUpRight size={20} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

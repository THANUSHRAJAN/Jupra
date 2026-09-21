import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Mail, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import SocialLink from './SocialLink';
import { site, mailtoHref } from '../config/site';
import { footerCompany, footerSolutions, legalLinks } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="footer__tag">{site.footerTagline}</p>
            <ul className="footer__areas" aria-label="Focus areas">
              {site.footerAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>Company</h3>
            <ul>
              {footerCompany.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>Solutions</h3>
            <ul>
              {footerSolutions.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>Connect</h3>
            <div className="footer__social">
              <SocialLink url={site.social.linkedin} label="LinkedIn" icon={Linkedin} showLabel />
              <SocialLink url={site.social.instagram} label="Instagram" icon={Instagram} showLabel />
              <SocialLink url={site.social.youtube} label="YouTube" icon={Youtube} showLabel />
              <a className="social" href={mailtoHref()} aria-label="Email JUPRA">
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.name}. All Rights Reserved.
          </p>
          <ul className="footer__legal">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <a className="footer__top" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Back to top <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

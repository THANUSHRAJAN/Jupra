import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { navLinks, ctaLink } from '../data/content';
import { site } from '../config/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <Logo className="nav__logo" onClick={() => setOpen(false)} />

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className="nav__link">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="nav__pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="nav__label">{l.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <a href={site.contact.phoneHref} className="nav__phone" aria-label={`Call ${site.contact.phoneDisplay}`}>
            <Phone size={16} />
            <span>{site.contact.phoneDisplay}</span>
          </a>
          <NavLink to={ctaLink.to} className="btn btn-primary btn-sm nav__cta">
            <span>{ctaLink.label}</span>
            <ArrowRight size={16} />
          </NavLink>
          <button
            className="nav__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="drawer__links" aria-label="Mobile">
              {[...navLinks, ctaLink].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) => `drawer__link ${isActive ? 'is-active' : ''} ${l.to === ctaLink.to ? 'is-cta' : ''}`}
                  >
                    <span>{l.label}</span>
                    <ArrowRight size={18} />
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <a href={site.contact.phoneHref} className="drawer__call">
              <Phone size={18} /> {site.contact.phoneDisplay}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

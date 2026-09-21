import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import mark from '../assets/jupra-mark.svg';

/** Shared page header used by inner pages. */
export default function PageHero({ crumb, eyebrow, title, lede, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" aria-hidden="true">
        <span className="blob blob--blue" />
        <span className="blob blob--pink" />
        <span className="grid-fade" />
        <img src={mark} alt="" className="page-hero__mark" />
      </div>
      <div className="container page-hero__inner">
        <motion.nav
          className="crumbs"
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span aria-current="page">{crumb}</span>
        </motion.nav>
        {eyebrow && (
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {lede && (
          <motion.p
            className="page-lede"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {lede}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import HeroVisual from '../components/HeroVisual';
import ProductVisual from '../components/ProductVisual';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { services, capabilities, marqueeItems, audiences, products } from '../data/content';
import { site } from '../config/site';

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

export default function Home() {
  const featured = products[0];
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <span className="blob blob--blue" />
          <span className="blob blob--pink" />
          <span className="grid-fade" />
        </div>

        <div className="container hero__inner">
          <div className="hero__copy">
            <motion.span className="pill" {...rise(0)}>
              <Sparkles size={14} />
              {site.name} <b>·</b> {site.tagline}
            </motion.span>

            <motion.h1 className="hero__title" {...rise(1)}>
              Turning Real-World Problems into{' '}
              <span className="text-grad">Smart Technology Solutions</span>
            </motion.h1>

            <motion.p className="hero__text" {...rise(2)}>
              We develop innovative technology solutions using AI, IoT, automation and intelligent
              hardware to solve practical problems for individuals, businesses and institutions.
            </motion.p>

            <motion.div className="hero__cta" {...rise(3)}>
              <Link to="/#what-we-do" className="btn btn-primary">
                <span>Explore Solutions</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Contact Us
              </Link>
            </motion.div>

            <motion.ul className="hero__aud" {...rise(4)} aria-label="Who we serve">
              {audiences.map((a) => (
                <li key={a.label}>
                  <span><a.icon size={16} /></span>
                  {a.label}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="hero__visual">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ───────── MARQUEE ───────── */}
      <div className="marquee" aria-label="Technologies we work with">
        <div className="marquee__track">
          {[0, 1].map((n) => (
            <ul className="marquee__group" key={n} aria-hidden={n === 1}>
              {marqueeItems.map((m) => (
                <li key={m + n}>
                  <span className="marquee__dot" />
                  {m}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ───────── WHAT WE DO ───────── */}
      <section className="section" id="what-we-do">
        <div className="container">
          <SectionHeading
            eyebrow="What We Do"
            title="Technology built around real problems"
            lede="From intelligent software to connected hardware, we design end-to-end solutions that are practical, reliable and ready for the real world."
          />

          <div className="grid grid--4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="card card--service">
                <span className="icon-tile"><s.icon size={26} strokeWidth={1.7} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="card__num">0{i + 1}</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="cap">
            <div className="cap__head">
              <h3>Core Capabilities</h3>
              <span className="cap__line" />
            </div>
            <ul className="cap__grid">
              {capabilities.map((c) => (
                <li key={c.title} className="cap__item">
                  <span className="cap__ico"><c.icon size={20} strokeWidth={1.8} /></span>
                  {c.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ───────── PRODUCT TEASER ───────── */}
      <section className="section section--soft">
        <div className="container">
          <Reveal className="feature">
            <div className="feature__visual">
              <ProductVisual product={featured} />
            </div>
            <div className="feature__copy">
              <span className="eyebrow">Our Products</span>
              <h2 className="section-title">
                {featured.name} <span className="text-grad">— {featured.status}</span>
              </h2>
              <p className="section-lede">{featured.description}</p>
              <ul className="ticks">
                {featured.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="row">
                <Link to="/products" className="btn btn-primary">
                  <span>View Products</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn btn-ghost">
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="section">
        <div className="container">
          <Reveal className="cta">
            <span className="cta__orb cta__orb--1" aria-hidden="true" />
            <span className="cta__orb cta__orb--2" aria-hidden="true" />
            <div className="cta__copy">
              <span className="eyebrow eyebrow--light">Let&apos;s talk</span>
              <h2>Have a Problem? Let&apos;s Build the Solution.</h2>
              <p>Tell us your requirement and our team will explore a suitable technology solution.</p>
            </div>
            <Link to="/get-started" className="btn btn-white">
              <span>Submit Your Requirement</span>
              <Send size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, Target, Telescope } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Logo from '../components/Logo';
import { aboutText, beliefs, techAreas } from '../data/content';

export default function About() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="About Us"
        title={<>Innovate. Build. <span className="text-grad">Grow.</span></>}
        lede="We are a technology startup on a mission to make intelligent technology practical, accessible and genuinely useful."
      />

      {/* WHO WE ARE */}
      <section className="section section--tight">
        <div className="container split">
          <div className="split__copy">
            <SectionHeading align="left" eyebrow="Who We Are" title="A startup built on practical technology" />
            <Reveal delay={0.1}>
              {aboutText.who.map((t) => (
                <p key={t} className="prose">{t}</p>
              ))}
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: 12 }}>
                <span>Work With Us</span>
                <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>

          <Reveal className="brand-panel" x={30} y={0}>
            <span className="brand-panel__ring brand-panel__ring--1" />
            <span className="brand-panel__ring brand-panel__ring--2" />
            <Logo variant="stacked" to={null} />
          </Reveal>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="section section--soft">
        <div className="container">
          <div className="grid grid--2">
            <Reveal className="card card--mv">
              <span className="icon-tile"><Target size={26} strokeWidth={1.7} /></span>
              <span className="eyebrow">Our Mission</span>
              <p className="mv__text">{aboutText.mission}</p>
            </Reveal>
            <Reveal delay={0.1} className="card card--mv card--mv-pink">
              <span className="icon-tile icon-tile--pink"><Telescope size={26} strokeWidth={1.7} /></span>
              <span className="eyebrow eyebrow--pink">Our Vision</span>
              <p className="mv__text">{aboutText.vision}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What We Believe"
            title="The principles behind everything we build"
          />
          <div className="beliefs">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07} className="card card--belief">
                <span className="icon-tile icon-tile--sm"><b.icon size={22} strokeWidth={1.7} /></span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH AREAS */}
      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Our Technology Areas"
            title={<>AI <span className="sep">|</span> IoT <span className="sep">|</span> Software</>}
            lede="Three connected disciplines that let us take an idea from concept to a complete working system."
          />
          <div className="grid grid--3 grid--odd">
            {techAreas.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.1} className="card card--tech">
                <div className="tech__top">
                  <span className="icon-tile"><t.icon size={26} strokeWidth={1.7} /></span>
                  <span className="card__num">0{i + 1}</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <ul className="tags">
                  {t.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

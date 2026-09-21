import { ArrowRight, Linkedin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import SocialLink from '../components/SocialLink';
import mark from '../assets/jupra-mark.svg';
import { site } from '../config/site';
import { teamMembers } from '../data/content';

export default function Team() {
  const f = site.founder;
  return (
    <>
      <PageHero
        crumb="Founder / Team"
        eyebrow="Founder / Team"
        title={<>The people behind <span className="text-grad">JUPRA</span></>}
        lede="A passionate group of engineers, builders and thinkers turning ambitious ideas into working technology."
      />

      {/* FOUNDER */}
      <section className="section section--tight">
        <div className="container">
          <SectionHeading align="left" eyebrow="Meet Our Founder" title="Leading with vision and hands-on engineering" />
          <Reveal className="founder">
            <div className="founder__photo">
              {f.photo ? (
                <img src={f.photo} alt={f.name} />
              ) : (
                <div className="founder__ph" aria-hidden="true">
                  <span className="founder__ring founder__ring--1" />
                  <span className="founder__ring founder__ring--2" />
                  <img src={mark} alt="" />
                </div>
              )}
            </div>
            <div className="founder__info">
              <span className="badge badge--blue">{f.title}</span>
              <h3 className="founder__name">{f.name}</h3>
              {f.bio.map((p) => (
                <p key={p} className="prose">{p}</p>
              ))}
              <div className="founder__actions">
                <SocialLink url={f.linkedin || site.social.linkedin} label="LinkedIn" icon={Linkedin} showLabel className="social--btn" />
                <Link to="/contact" className="btn btn-ghost btn-sm">
                  <span>Get in touch</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section className="section section--soft">
        <div className="container">
          <SectionHeading eyebrow="Our Team" title="Skills that cover the whole journey" lede="From hardware to software to AI and business — every role needed to build a product end to end." />
          <div className="grid grid--3">
            {teamMembers.map((m, i) => (
              <Reveal key={m.role} delay={i * 0.07} className="card card--member">
                <div className="member__avatar">
                  {m.photo ? <img src={m.photo} alt={m.name || m.role} /> : <m.icon size={30} strokeWidth={1.5} />}
                </div>
                <h3>{m.role}</h3>
                <p className={m.name ? 'member__name' : 'member__name is-pending'}>
                  {m.name || 'Name to be announced'}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

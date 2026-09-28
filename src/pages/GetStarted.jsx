import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react';
import PageHero from '../components/PageHero';
import ChatBot from '../components/ChatBot';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { startPaths } from '../data/content';
import { site, mailtoHref } from '../config/site';

export default function GetStarted() {
  const [selected, setSelected] = useState(null);
  const [nonce, setNonce] = useState(0);

  const choose = (p) => {
    setSelected(p.key);
    setNonce((n) => n + 1);
    // Bring the chat into view
    setTimeout(() => {
      document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  return (
    <>
      <PageHero
        crumb="Get Started"
        eyebrow="Get Started"
        title={<>Have a Problem? <span className="text-grad">Let&apos;s Build the Solution.</span></>}
        lede="Whether you have an idea, a business challenge, a research concept or a requirement for a customized technology solution, tell us about it."
      />

      {/* CHOOSE */}
      <section className="section section--tight">
        <div className="container">
          <SectionHeading align="left" eyebrow="Step 1" title="Choose what you need" />
          <div className="paths">
            {startPaths.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.06} className="paths__cell">
                <button
                  className={`path ${selected === p.key ? 'is-on' : ''}`}
                  onClick={() => choose(p)}
                  aria-pressed={selected === p.key}
                >
                  <span className="icon-tile icon-tile--sm"><p.icon size={22} strokeWidth={1.7} /></span>
                  <span className="path__txt">
                    <strong>{p.title}</strong>
                    <small><ArrowRight size={14} /> {p.action}</small>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHAT */}
      <section className="section section--soft">
        <div className="container chat-wrap">
          <Reveal className="chat-wrap__copy">
            <span className="eyebrow">Step 2 · Chatbot</span>
            <h2 className="section-title">Start a Conversation</h2>
            <p className="section-lede">
              Prefer to talk it through? Our assistant will guide you in a minute or two and pass your
              requirement straight to the JUPRA team.
            </p>
            <ul className="direct">
              <li><a href={site.contact.phoneHref}><span><Phone size={18} /></span>{site.contact.phoneDisplay}</a></li>
              <li><a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer"><span><MessageCircle size={18} /></span>Chat on WhatsApp</a></li>
              <li><a href={mailtoHref()}><span><Mail size={18} /></span>{site.contact.email}</a></li>
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="chat-wrap__box">
            <ChatBot presetPath={startPaths.find((p) => p.key === selected)} nonce={nonce} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

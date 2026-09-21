import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, MessageCircle, Mail, RotateCcw, Phone } from 'lucide-react';
import mark from '../assets/jupra-mark.svg';
import { startPaths } from '../data/content';
import { site, mailtoHref } from '../config/site';
import { submitEnquiry, isEmail, isPhone } from '../utils/submit';

const STEP = { INTENT: 'intent', NAME: 'name', CONTACT: 'contact', DETAILS: 'details', REVIEW: 'review', DONE: 'done' };

const placeholders = {
  [STEP.INTENT]: 'Type your question or pick an option…',
  [STEP.NAME]: 'Your name',
  [STEP.CONTACT]: 'Email address or phone number',
  [STEP.DETAILS]: 'Describe your idea / problem / requirement…',
  [STEP.REVIEW]: 'Use the buttons above to continue',
  [STEP.DONE]: 'Ask another question…',
};

function faq(text) {
  const s = text.toLowerCase();
  if (/^(hi|hii|hello|hey)\b/.test(s)) return 'Hello! 👋 Pick an option below, or tell me a little about what you need.';
  if (/(phone|call|number|contact|email|mail|reach)/.test(s))
    return `You can reach us on ${site.contact.phoneDisplay} or at ${site.contact.email}.`;
  if (/(product)/.test(s)) return 'Our first products are coming soon — see the Products page for the latest updates.';
  if (/(where|location|address|office)/.test(s))
    return site.contact.location ? `We are based in ${site.contact.location}.` : 'Our location details will be shared soon — for now please reach us by phone or email.';
  if (/(price|cost|quote|budget|charge)/.test(s))
    return 'Pricing depends on the scope of your requirement. Share the details and our team will come back with a suitable proposal.';
  return null;
}

/** Guided lead-capture chatbot — no external service required. */
export default function ChatBot({ presetPath, nonce }) {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(STEP.INTENT);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const lead = useRef({ path: null, name: '', contact: '', details: '' });
  const bodyRef = useRef(null);
  const idRef = useRef(0);
  const alive = useRef(true);
  const timers = useRef([]);
  const run = useRef(0); // invalidates in-flight bot scripts on restart

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; timers.current.forEach(clearTimeout); };
  }, []);

  const push = (from, text) => setMessages((m) => [...m, { id: ++idRef.current, from, text }]);

  const say = useCallback((text) => {
    const myRun = run.current;
    return new Promise((resolve) => {
      setTyping(true);
      const t = setTimeout(() => {
        if (!alive.current || myRun !== run.current) return resolve();
        setTyping(false);
        setMessages((m) => [...m, { id: ++idRef.current, from: 'bot', text }]);
        resolve();
      }, Math.min(450 + text.length * 7, 1300));
      timers.current.push(t);
    });
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, step]);

  const start = useCallback(async (path = null) => {
    run.current += 1;
    timers.current.forEach(clearTimeout);
    lead.current = { path, name: '', contact: '', details: '' };
    setStarted(true);
    setMessages([]);
    setTyping(false);
    setInput('');
    setSending(false);
    if (path) {
      setStep(STEP.INTENT);
      push('user', path.title);
      await say('Great choice — I would be happy to help with that. I will need a few quick details. First, may I know your name?');
      setStep(STEP.NAME);
    } else {
      setStep(STEP.INTENT);
      await say('Hi, I am the JUPRA assistant 👋');
      await say('What would you like to do today?');
    }
  }, [say]);

  // React to a path card being chosen on the page
  useEffect(() => {
    if (nonce > 0 && presetPath) start(presetPath);
  }, [nonce]); // eslint-disable-line react-hooks/exhaustive-deps

  const askReview = async () => {
    const l = lead.current;
    await say(
      `Here is a summary of your enquiry:\n• Need: ${l.path?.title || 'General enquiry'}\n• Name: ${l.name}\n• Contact: ${l.contact}\n• Details: ${l.details}\n\nShall I send this to the JUPRA team?`
    );
    setStep(STEP.REVIEW);
  };

  const choosePath = async (path) => {
    lead.current.path = path;
    push('user', path.title);
    setStep(STEP.INTENT);
    await say('Happy to help with that! May I know your name?');
    setStep(STEP.NAME);
  };

  const onSend = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || typing || sending) return;
    push('user', text);
    setInput('');
    const l = lead.current;

    if (step === STEP.INTENT || step === STEP.DONE) {
      const answer = faq(text);
      if (answer) return void (await say(answer));
      if (step === STEP.DONE) return void (await say('Thanks! Our team will follow up shortly. You can also start a new enquiry using the button above.'));
      l.path = startPaths.find((p) => p.key === 'custom');
      l.details = text;
      await say('Thanks for sharing that. May I know your name so the team can reach you?');
      return setStep(STEP.NAME);
    }

    if (step === STEP.NAME) {
      if (text.length < 2) return void (await say('Could you share your name, please?'));
      l.name = text;
      await say(`Nice to meet you, ${text}! What is the best email address or phone number to reach you on?`);
      return setStep(STEP.CONTACT);
    }

    if (step === STEP.CONTACT) {
      if (!isEmail(text) && !isPhone(text))
        return void (await say('That does not look like a valid email or phone number. Could you check it once more?'));
      l.contact = text;
      if (l.details) return void (await askReview());
      await say('Perfect. Please describe your idea, problem or requirement in a few lines.');
      return setStep(STEP.DETAILS);
    }

    if (step === STEP.DETAILS) {
      if (text.length < 8) return void (await say('Could you add a little more detail so our team can understand better?'));
      l.details = text;
      return void (await askReview());
    }

    if (step === STEP.REVIEW) {
      await say('Please use the buttons below to send your enquiry or start over.');
    }
  };

  const send = async () => {
    const l = lead.current;
    push('user', 'Send to JUPRA team');
    setSending(true);
    try {
      const res = await submitEnquiry({
        name: l.name,
        email: isEmail(l.contact) ? l.contact : '',
        phone: isEmail(l.contact) ? '' : l.contact,
        requirementType: l.path?.title || 'General enquiry',
        message: l.details,
        source: 'Chatbot — Get Started',
      });
      setSending(false);
      setStep(STEP.DONE);
      await say(
        res.mode === 'mailto'
          ? 'Your email app has opened with everything filled in — just press Send to deliver it to our team. ✅'
          : `Thank you, ${l.name}! Your enquiry has been sent. Our team will get in touch with you soon. ✅`
      );
      await say('Need a faster reply? You can also call or message us directly.');
    } catch {
      setSending(false);
      await say('Sorry, something went wrong while sending. Please try again, or reach us directly by phone, WhatsApp or email.');
    }
  };

  return (
    <div className="chat" id="chat">
      <div className="chat__head">
        <span className="chat__avatar"><img src={mark} alt="" /></span>
        <div>
          <strong>JUPRA Assistant</strong>
          <span className="chat__status"><i /> Online · replies instantly</span>
        </div>
        {started && (
          <button className="chat__reset" onClick={() => start(null)} aria-label="Restart conversation" title="Restart">
            <RotateCcw size={16} />
          </button>
        )}
      </div>

      {!started ? (
        <div className="chat__intro">
          <motion.span className="chat__intro-ico" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}>
            <MessageCircle size={30} />
          </motion.span>
          <h3>Start a Conversation</h3>
          <p>Tell our assistant what you need — it takes less than a minute.</p>
          <button className="btn btn-primary" onClick={() => start(null)}>
            <span>Start a Conversation</span>
            <MessageCircle size={17} />
          </button>
        </div>
      ) : (
        <>
          <div className="chat__body" ref={bodyRef} aria-live="polite">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  className={`msg msg--${m.from}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28 }}
                >
                  {m.from === 'bot' && <span className="msg__av"><img src={mark} alt="" /></span>}
                  <div className="msg__bubble">{m.text}</div>
                </motion.div>
              ))}
              {typing && (
                <motion.div key="typing" className="msg msg--bot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span className="msg__av"><img src={mark} alt="" /></span>
                  <div className="msg__bubble typing"><i /><i /><i /></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick replies */}
          {!typing && (
            <div className="chat__quick">
              {step === STEP.INTENT && startPaths.map((p) => (
                <button key={p.key} className="qr" onClick={() => choosePath(p)}>{p.title}</button>
              ))}
              {step === STEP.REVIEW && !sending && (
                <>
                  <button className="qr qr--primary" onClick={send}>Send to JUPRA team</button>
                  <button className="qr" onClick={() => start(null)}>Start over</button>
                </>
              )}
              {step === STEP.DONE && (
                <>
                  <a className="qr" href={site.contact.phoneHref}><Phone size={14} /> Call</a>
                  <a className="qr" href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /> WhatsApp</a>
                  <a className="qr" href={mailtoHref('Enquiry from JUPRA website')}><Mail size={14} /> Email</a>
                  <button className="qr" onClick={() => start(null)}>New enquiry</button>
                </>
              )}
            </div>
          )}

          <form className="chat__input" onSubmit={onSend}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholders[step]}
              disabled={step === STEP.REVIEW || sending}
              aria-label="Type your message"
            />
            <button type="submit" disabled={!input.trim() || typing || sending} aria-label="Send message">
              <ArrowUp size={18} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}

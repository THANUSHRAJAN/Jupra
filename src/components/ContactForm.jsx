import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Paperclip, Send, Upload, X } from 'lucide-react';
import { requirementTypes } from '../data/content';
import { site } from '../config/site';
import { submitEnquiry, isEmail } from '../utils/submit';

const empty = { name: '', email: '', phone: '', organization: '', requirementType: '', message: '' };

export default function ContactForm() {
  const [params] = useSearchParams();
  const product = params.get('product');
  const initial = useMemo(
    () => ({ ...empty, message: product ? `I am interested in ${product}. ` : '' }),
    [product]
  );

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [mode, setMode] = useState('endpoint');
  const [honey, setHoney] = useState('');
  const fileRef = useRef(null);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const pickFile = (f) => {
    if (!f) return;
    if (f.size > site.form.maxFileMB * 1024 * 1024) {
      setErrors((er) => ({ ...er, file: `File is larger than ${site.form.maxFileMB} MB.` }));
      return;
    }
    setErrors((er) => ({ ...er, file: undefined }));
    setFile(f);
  };

  const validate = () => {
    const er = {};
    if (values.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!isEmail(values.email)) er.email = 'Please enter a valid email address.';
    if (values.phone && values.phone.replace(/\D/g, '').length < 8) er.phone = 'Please enter a valid phone number.';
    if (values.message.trim().length < 10) er.message = 'Please tell us a little more (at least 10 characters).';
    return er;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (honey) return; // bot trap
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    try {
      const res = await submitEnquiry({ ...values, file, source: 'Contact page' });
      setMode(res.mode);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(empty); setFile(null); setErrors({}); setStatus('idle');
  };

  return (
    <div className="form-card">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="ok"
            className="form-success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="form-success__ico"><CheckCircle2 size={38} /></span>
            <h3>{mode === 'mailto' ? 'Almost there!' : 'Thank you — enquiry received'}</h3>
            <p>
              {mode === 'mailto'
                ? 'Your email app has opened with your enquiry pre-filled. Please press Send there to deliver it to our team.'
                : 'Our team will review your requirement and get back to you shortly.'}
            </p>
            <button className="btn btn-ghost" onClick={reset}>Send another enquiry</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="form-head">
              <h2>Send us your requirement</h2>
              <p>Fields marked <b>*</b> are required.</p>
            </div>

            {/* honeypot (hidden from humans) */}
            <input type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="hp" aria-hidden="true" />

            <div className="form-grid">
              <Field label="Name" required error={errors.name}>
                <input type="text" value={values.name} onChange={set('name')} placeholder="Your full name" autoComplete="name" />
              </Field>
              <Field label="Email" required error={errors.email}>
                <input type="email" value={values.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input type="tel" value={values.phone} onChange={set('phone')} placeholder="+91 00000 00000" autoComplete="tel" />
              </Field>
              <Field label="Organization / Company">
                <input type="text" value={values.organization} onChange={set('organization')} placeholder="Company or institution" autoComplete="organization" />
              </Field>

              <div className="field field--full">
                <span className="field__label" id="req-label">Requirement Type</span>
                <div className="chips" role="radiogroup" aria-labelledby="req-label">
                  {requirementTypes.map((t) => {
                    const on = values.requirementType === t;
                    return (
                      <button
                        type="button"
                        key={t}
                        role="radio"
                        aria-checked={on}
                        className={`chip ${on ? 'is-on' : ''}`}
                        onClick={() => setValues((v) => ({ ...v, requirementType: on ? '' : t }))}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field label="Tell Us About Your Requirement" required error={errors.message} full>
                <textarea rows={5} value={values.message} onChange={set('message')} placeholder="Describe your idea, problem or requirement…" />
              </Field>

              <div className="field field--full">
                <span className="field__label">Upload File <em>(optional)</em></span>
                <div
                  className={`drop ${drag ? 'is-drag' : ''} ${file ? 'has-file' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files?.[0]); }}
                >
                  <input ref={fileRef} type="file" hidden onChange={(e) => pickFile(e.target.files?.[0])} />
                  {file ? (
                    <div className="drop__file">
                      <Paperclip size={18} />
                      <span>{file.name}</span>
                      <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                      <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ''; }} aria-label="Remove file"><X size={16} /></button>
                    </div>
                  ) : (
                    <button type="button" className="drop__btn" onClick={() => fileRef.current?.click()}>
                      <span className="drop__ico"><Upload size={20} /></span>
                      <span><b>Click to upload</b> or drag &amp; drop<small>Documents, images or sketches · up to {site.form.maxFileMB} MB</small></span>
                    </button>
                  )}
                </div>
                {errors.file && <span className="field__err"><AlertCircle size={14} />{errors.file}</span>}
              </div>
            </div>

            {status === 'error' && (
              <div className="alert" role="alert">
                <AlertCircle size={18} />
                <span>We could not send your enquiry right now. Please try again, or email us at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</span>
              </div>
            )}

            <button className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
              {status === 'sending' ? (<><Loader2 size={18} className="spin" /> Sending…</>) : (<><span>Submit Enquiry</span><Send size={17} /></>)}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, required, error, full, children }) {
  return (
    <label className={`field ${full ? 'field--full' : ''} ${error ? 'has-error' : ''}`}>
      <span className="field__label">{label} {required && <b>*</b>}</span>
      {children}
      {error && <span className="field__err"><AlertCircle size={14} />{error}</span>}
    </label>
  );
}

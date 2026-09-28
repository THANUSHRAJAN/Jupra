import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft, Eye, EyeOff, KeyRound, Loader2, Lock, Mail, ShieldCheck,
} from 'lucide-react';
import Logo from '../../components/Logo';
import { apiRequest } from '../../config/api';
import { setToken } from '../../utils/auth';

const STEP = {
  LOGIN: 'login',
  FORGOT_EMAIL: 'forgot-email',
  FORGOT_OTP: 'forgot-otp',
  FORGOT_RESET: 'forgot-reset',
};

const titles = {
  [STEP.LOGIN]: ['Founder Access', 'Sign in to view contact enquiries.'],
  [STEP.FORGOT_EMAIL]: ['Reset Password', "Enter your account email and we'll send a 6-digit code."],
  [STEP.FORGOT_OTP]: ['Enter Code', 'Enter the 6-digit code sent to your email.'],
  [STEP.FORGOT_RESET]: ['New Password', 'Choose a new password for your account.'],
};

export default function Login({ onLoggedIn }) {
  const [step, setStep] = useState(STEP.LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  function goTo(next) {
    setError('');
    setNotice('');
    setStep(next);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiRequest('/api/auth/login', { method: 'POST', auth: false, body: { email, password } });
      setToken(data.token);
      onLoggedIn(data.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiRequest('/api/auth/forgot-password', { method: 'POST', auth: false, body: { email } });
      setNotice('If that email is registered, a 6-digit code has been sent to it.');
      setStep(STEP.FORGOT_OTP);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiRequest('/api/auth/verify-otp', { method: 'POST', auth: false, body: { email, otp } });
      setResetToken(data.resetToken);
      setNotice('');
      setStep(STEP.FORGOT_RESET);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setError('');
    if (newPassword.length < 8) return setError('Password must be at least 8 characters.');
    if (newPassword !== confirmPassword) return setError('Passwords do not match.');
    setLoading(true);
    try {
      await apiRequest('/api/auth/reset-password', {
        method: 'POST',
        auth: false,
        body: { resetToken, newPassword },
      });
      setPassword('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setNotice('Password updated — please sign in.');
      setStep(STEP.LOGIN);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const [heading, sub] = titles[step];

  return (
    <div className="founder-auth">
      <div className="founder-auth__card">
        <Logo variant="stacked" to={null} />
        <h1>{heading}</h1>
        <p className="founder-auth__sub">{sub}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28 }}
          >
            {step === STEP.LOGIN && (
              <form onSubmit={handleLogin} className="founder-auth__form">
                <label className="field">
                  <span className="field__label">Email</span>
                  <div className="input-icon">
                    <Mail size={17} />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="username" />
                  </div>
                </label>
                <label className="field">
                  <span className="field__label">Password</span>
                  <div className="input-icon">
                    <Lock size={17} />
                    <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
                    <button type="button" className="input-icon__toggle" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </label>

                {error && <div className="alert">{error}</div>}
                {notice && <div className="founder-notice">{notice}</div>}

                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? <><Loader2 size={18} className="spin" /> Signing in…</> : 'Sign In'}
                </button>
                <button type="button" className="founder-auth__link" onClick={() => goTo(STEP.FORGOT_EMAIL)}>
                  Forgot password?
                </button>
              </form>
            )}

            {step === STEP.FORGOT_EMAIL && (
              <form onSubmit={handleSendOtp} className="founder-auth__form">
                <label className="field">
                  <span className="field__label">Email</span>
                  <div className="input-icon">
                    <Mail size={17} />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="username" />
                  </div>
                </label>

                {error && <div className="alert">{error}</div>}

                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? <><Loader2 size={18} className="spin" /> Sending…</> : 'Send Code'}
                </button>
                <button type="button" className="founder-auth__back" onClick={() => goTo(STEP.LOGIN)}>
                  <ArrowLeft size={15} /> Back to sign in
                </button>
              </form>
            )}

            {step === STEP.FORGOT_OTP && (
              <form onSubmit={handleVerifyOtp} className="founder-auth__form">
                {notice && <div className="founder-notice">{notice}</div>}
                <label className="field">
                  <span className="field__label">6-digit code</span>
                  <div className="input-icon">
                    <KeyRound size={17} />
                    <input
                      type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6} required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      className="otp-input"
                    />
                  </div>
                </label>

                {error && <div className="alert">{error}</div>}

                <button className="btn btn-primary btn-block" disabled={loading || otp.length !== 6}>
                  {loading ? <><Loader2 size={18} className="spin" /> Verifying…</> : <><ShieldCheck size={17} /> Verify Code</>}
                </button>
                <button type="button" className="founder-auth__link" onClick={handleSendOtp} disabled={loading}>
                  Resend code
                </button>
                <button type="button" className="founder-auth__back" onClick={() => goTo(STEP.FORGOT_EMAIL)}>
                  <ArrowLeft size={15} /> Change email
                </button>
              </form>
            )}

            {step === STEP.FORGOT_RESET && (
              <form onSubmit={handleResetPassword} className="founder-auth__form">
                <label className="field">
                  <span className="field__label">New password</span>
                  <div className="input-icon">
                    <Lock size={17} />
                    <input type={showPassword ? 'text' : 'password'} required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" />
                    <button type="button" className="input-icon__toggle" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </label>
                <label className="field">
                  <span className="field__label">Confirm password</span>
                  <div className="input-icon">
                    <Lock size={17} />
                    <input type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" autoComplete="new-password" />
                  </div>
                </label>

                {error && <div className="alert">{error}</div>}

                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? <><Loader2 size={18} className="spin" /> Updating…</> : 'Update Password'}
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

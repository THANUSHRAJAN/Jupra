import { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getToken, clearToken, isTokenValid } from '../../utils/auth';
import { apiRequest } from '../../config/api';
import Login from './Login';
import Dashboard from './Dashboard';

/**
 * Gatekeeper for the hidden founder route ("/founderofjupra").
 * Shows a loading state while it checks for a valid stored session, then either the
 * Login screen (with its own "forgot password" flow) or the Dashboard.
 */
export default function Founder() {
  const [status, setStatus] = useState('checking'); // checking | authed | guest
  const [email, setEmail] = useState('');

  const verify = useCallback(async () => {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
      clearToken();
      setStatus('guest');
      return;
    }
    try {
      const me = await apiRequest('/api/admin/me');
      setEmail(me.email);
      setStatus('authed');
    } catch {
      clearToken();
      setStatus('guest');
    }
  }, []);

  useEffect(() => {
    verify();
  }, [verify]);

  function handleLoggedIn(em) {
    setEmail(em);
    setStatus('authed');
  }

  function handleLogout() {
    clearToken();
    setStatus('guest');
  }

  if (status === 'checking') {
    return (
      <div className="founder-loading">
        <Loader2 className="spin" size={26} />
        <span>Checking session…</span>
      </div>
    );
  }

  return status === 'authed'
    ? <Dashboard email={email} onLogout={handleLogout} />
    : <Login onLoggedIn={handleLoggedIn} />;
}

import { useEffect, useMemo, useState } from 'react';
import {
  Eye, FileText, Inbox, LogOut, RefreshCw, Search, X, Loader2,
} from 'lucide-react';
import Logo from '../../components/Logo';
import { apiRequest, API_BASE } from '../../config/api';
import { getToken } from '../../utils/auth';

export default function Dashboard({ email, onLogout }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await apiRequest('/api/admin/enquiries');
      setRows(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function openDetail(id) {
    setDetail(null);
    setDetailLoading(true);
    try {
      const data = await apiRequest(`/api/admin/enquiries/${id}`);
      setDetail(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailLoading(false);
    }
  }

  function openDocument(id) {
    const token = getToken();
    const url = `${API_BASE}/api/admin/enquiries/${id}/document?token=${encodeURIComponent(token)}`;
    window.open(url, '_blank', 'noopener');
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.email, r.phone, r.organization, r.requirementType]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [rows, query]);

  return (
    <div className="founder-dash">
      <header className="founder-dash__head">
        <Logo />
        <div className="founder-dash__who">
          <span>
            Signed in as <b>{email}</b>
          </span>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="container founder-dash__body">
        <div className="founder-dash__bar">
          <div>
            <h1>Contact Enquiries</h1>
            <p>Everyone who has submitted the Contact form or chatbot on the website.</p>
          </div>
          <div className="founder-dash__tools">
            <div className="input-icon input-icon--search">
              <Search size={16} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, phone…" />
            </div>
            <button className="icon-btn icon-btn--ghost" onClick={load} title="Refresh" aria-label="Refresh">
              <RefreshCw size={17} className={loading ? 'spin' : ''} />
            </button>
          </div>
        </div>

        {error && <div className="alert">{error}</div>}

        <div className="admin-table-wrap">
          {loading ? (
            <div className="founder-empty">
              <Loader2 className="spin" size={28} />
              <span>Loading enquiries…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="founder-empty">
              <Inbox size={30} />
              <span>{rows.length === 0 ? 'No enquiries yet.' : 'No matches for that search.'}</span>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Requirement</th>
                  <th>Received</th>
                  <th>File</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td className="admin-table__email">{r.email}</td>
                    <td>{r.phone || '—'}</td>
                    <td>{r.requirementType || '—'}</td>
                    <td className="admin-table__date">{formatDate(r.createdAt)}</td>
                    <td>{r.hasAttachment ? <span className="admin-table__file-badge">{r.attachmentName || 'File'}</span> : '—'}</td>
                    <td className="admin-table__actions">
                      <button className="icon-btn" title="View details" aria-label="View details" onClick={() => openDetail(r.id)}>
                        <Eye size={17} />
                      </button>
                      <button
                        className="icon-btn"
                        title={r.hasAttachment ? 'View document' : 'No document attached'}
                        aria-label="View document"
                        disabled={!r.hasAttachment}
                        onClick={() => openDocument(r.id)}
                      >
                        <FileText size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {(detail || detailLoading) && (
        <div className="modal-overlay" onClick={() => setDetail(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setDetail(null)} aria-label="Close">
              <X size={18} />
            </button>

            {detailLoading && !detail ? (
              <div className="founder-empty">
                <Loader2 className="spin" size={26} />
              </div>
            ) : (
              detail && (
                <>
                  <h2>{detail.name}</h2>
                  <dl className="detail-grid">
                    <div><dt>Email</dt><dd>{detail.email}</dd></div>
                    <div><dt>Phone</dt><dd>{detail.phone || '—'}</dd></div>
                    <div><dt>Organization</dt><dd>{detail.organization || '—'}</dd></div>
                    <div><dt>Requirement type</dt><dd>{detail.requirementType || '—'}</dd></div>
                    <div><dt>Source</dt><dd>{detail.source || '—'}</dd></div>
                    <div><dt>Received</dt><dd>{formatDate(detail.createdAt)}</dd></div>
                  </dl>
                  <h3 className="mini-title">Message</h3>
                  <p className="detail-message">{detail.message || '—'}</p>
                  {detail.hasAttachment && (
                    <button className="btn btn-primary btn-sm" onClick={() => openDocument(detail.id)}>
                      <FileText size={16} /> View attached document
                    </button>
                  )}
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

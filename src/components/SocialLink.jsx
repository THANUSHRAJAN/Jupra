import { hasLink } from '../config/site';

/** Renders a social link. If no URL is set yet, shows a disabled "coming soon" state. */
export default function SocialLink({ url, label, icon: Icon, className = '', showLabel = false }) {
  const ready = hasLink(url);
  return (
    <a
      href={ready ? url : '#'}
      target={ready ? '_blank' : undefined}
      rel={ready ? 'noopener noreferrer' : undefined}
      onClick={(e) => { if (!ready) e.preventDefault(); }}
      aria-label={ready ? label : `${label} (link coming soon)`}
      aria-disabled={!ready}
      title={ready ? label : `${label} — link coming soon`}
      className={`social ${ready ? '' : 'is-pending'} ${className}`}
    >
      <Icon size={18} />
      {showLabel && <span>{label}</span>}
    </a>
  );
}

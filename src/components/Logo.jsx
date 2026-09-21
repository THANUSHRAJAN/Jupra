import { Link } from 'react-router-dom';
import mark from '../assets/jupra-mark.svg';
import wordmark from '../assets/jupra-wordmark.svg';

/**
 * JUPRA logo — vector-traced from the supplied brand image.
 * variant="horizontal"  → J-mark + JUPRA wordmark (navbar / footer)
 * variant="stacked"     → J-mark above wordmark + tagline (brand panels)
 * variant="mark"        → J-mark only
 */
export default function Logo({ variant = 'horizontal', to = '/', className = '', onClick }) {
  const content =
    variant === 'mark' ? (
      <img src={mark} alt="JUPRA" className="logo-mark" draggable="false" />
    ) : variant === 'stacked' ? (
      <span className="logo logo--stacked">
        <img src={mark} alt="" className="logo-mark" draggable="false" />
        <img src={wordmark} alt="JUPRA" className="logo-word" draggable="false" />
        <span className="logo-tag">
          <i />
          <span>
            Innovate <b>✦</b> Build <b>✦</b> Grow
          </span>
          <i />
        </span>
      </span>
    ) : (
      <span className="logo logo--horizontal">
        <img src={mark} alt="" className="logo-mark" draggable="false" />
        <img src={wordmark} alt="JUPRA" className="logo-word" draggable="false" />
      </span>
    );

  if (!to) return <span className={className}>{content}</span>;
  return (
    <Link to={to} className={`logo-link ${className}`} aria-label="JUPRA — Home" onClick={onClick}>
      {content}
    </Link>
  );
}

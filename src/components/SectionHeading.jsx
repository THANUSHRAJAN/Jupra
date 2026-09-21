import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, lede, align = 'center', as: Tag = 'h2' }) {
  return (
    <Reveal className={`section-head section-head--${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className="section-title">{title}</Tag>
      {lede && <p className="section-lede">{lede}</p>}
    </Reveal>
  );
}

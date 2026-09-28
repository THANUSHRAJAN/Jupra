import { motion } from 'framer-motion';

/** Scroll-reveal wrapper — fades & rises into view once. */
export default function Reveal({
  children, delay = 0, y = 28, x = 0, as = 'div', className = '', once = true, ...rest
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.2, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

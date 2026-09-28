import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Bot } from 'lucide-react';
import { site } from '../config/site';

/** Floating WhatsApp + chat shortcuts. */
export default function FloatingActions() {
  const { pathname } = useLocation();
  const onGetStarted = pathname === '/get-started';
  return (
    <motion.div
      className="fab-stack"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {!onGetStarted && (
        <Link to="/get-started#chat" className="fab fab--chat" aria-label="Start a conversation">
          <Bot size={20} />
          <span>Chat with us</span>
        </Link>
      )}
      <a
        href={site.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fab fab--wa"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </motion.div>
  );
}

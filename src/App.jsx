import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import PageWrap from './components/PageWrap';
import { ScrollToTop, ScrollProgress } from './components/ScrollManager';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import GetStarted from './pages/GetStarted';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrap><Home /></PageWrap>} />
          <Route path="/products" element={<PageWrap><Products /></PageWrap>} />
          <Route path="/about" element={<PageWrap><About /></PageWrap>} />
          <Route path="/team" element={<PageWrap><Team /></PageWrap>} />
          <Route path="/contact" element={<PageWrap><Contact /></PageWrap>} />
          <Route path="/get-started" element={<PageWrap><GetStarted /></PageWrap>} />
          <Route path="/privacy-policy" element={<PageWrap><Legal type="privacy" /></PageWrap>} />
          <Route path="/terms-and-conditions" element={<PageWrap><Legal type="terms" /></PageWrap>} />
          <Route path="/cookie-policy" element={<PageWrap><Legal type="cookies" /></PageWrap>} />
          <Route path="*" element={<PageWrap><NotFound /></PageWrap>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <FloatingActions />
    </MotionConfig>
  );
}

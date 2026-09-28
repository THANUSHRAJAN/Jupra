import { motion } from 'framer-motion';
import { Brain, Wifi, ScanEye, Cloud } from 'lucide-react';
import mark from '../assets/jupra-mark.svg';

/**
 * Solar-system hero graphic
 *   ☀  JUPRA logo  = the sun (centre, softly pulsing)
 *   🪐 AI · IoT · Computer Vision · Edge & Cloud = planets that keep orbiting the sun
 *
 * Every ring spins forever at its own speed (the middle ring runs the other way).
 * Each planet counter-rotates, so its icon and label always stay upright.
 * `a` = the planet's starting angle on its orbit.
 */
const rings = [
  {
    id: 1,
    planets: [
      { label: 'Artificial Intelligence', icon: Brain, a: '0deg' },
      { label: 'Computer Vision', icon: ScanEye, a: '180deg' },
    ],
  },
  {
    id: 2,
    planets: [
      { label: 'IoT', icon: Wifi, a: '90deg' },
      { label: 'Edge & Cloud', icon: Cloud, a: '270deg' },
    ],
  },
  { id: 3, planets: [] },
];

export default function HeroVisual() {
  return (
    <motion.div
      className="hv"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <span className="hv__glow" />

      {rings.map((r) => (
        <div key={r.id} className={`hv__ring hv__ring--${r.id}`}>
          {r.planets.map((p) => (
            <div key={p.label} className="hv__slot" style={{ '--a': p.a }}>
              <div className="hv__planet">
                <span className="hv__planet-in">
                  <span className="hv__planet-ico">
                    <p.icon size={20} strokeWidth={1.9} />
                  </span>
                  <span className="hv__planet-label">{p.label}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* The sun */}
      <div className="hv__core">
        <img src={mark} alt="" className="hv__mark" draggable="false" />
      </div>
    </motion.div>
  );
}

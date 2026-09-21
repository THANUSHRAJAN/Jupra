import {
  Brain, Wifi, Network, Cpu, Layers, BrainCircuit, ScanEye, Server, Cloud,
  MessagesSquare, Lightbulb, Accessibility, Leaf, Wrench, HeartHandshake,
  Target, Telescope, Code2, Rocket, Handshake, Puzzle, Boxes, Settings2,
  Crown, UserCog, Megaphone, Microscope, CircuitBoard, Workflow, Sigma,
  Users, Building2, User,
} from 'lucide-react';

/* ─────────────  NAVIGATION  ───────────── */
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Founder / Team', to: '/team' },
  { label: 'Contact Us', to: '/contact' },
];
export const ctaLink = { label: 'Get Started', to: '/get-started' };

/* ─────────────  HOME → WHAT WE DO  ───────────── */
export const services = [
  {
    title: 'Artificial Intelligence',
    icon: Brain,
    text: 'Intelligent systems that learn, predict and decide — turning raw data into actions that matter.',
  },
  {
    title: 'Internet of Things',
    icon: Wifi,
    text: 'Connected devices and sensors that bring real-world data online, reliably and securely.',
  },
  {
    title: 'AIoT (AI + IoT)',
    icon: Network,
    text: 'The best of both worlds — smart devices that sense, think and respond on their own.',
  },
  {
    title: 'Smart Hardware',
    icon: Cpu,
    text: 'Purpose-built electronics and embedded systems, designed from prototype to product.',
  },
];

export const capabilities = [
  { title: 'Deep Learning', icon: Layers },
  { title: 'Machine Learning', icon: Sigma },
  { title: 'Computer Vision', icon: ScanEye },
  { title: 'Edge Computing', icon: Server },
  { title: 'Cloud Computing', icon: Cloud },
  { title: 'Natural Language Processing', icon: MessagesSquare },
];

export const marqueeItems = [
  'Artificial Intelligence', 'Internet of Things', 'AIoT', 'Smart Hardware',
  'Deep Learning', 'Machine Learning', 'Computer Vision', 'Edge Computing',
  'Cloud Computing', 'Natural Language Processing',
];

export const audiences = [
  { label: 'Individuals', icon: User },
  { label: 'Businesses', icon: Building2 },
  { label: 'Institutions', icon: Users },
];

/* ─────────────  PRODUCTS  (edit / add real products here)  ─────────────
   image: '' → elegant placeholder is shown.
   To use a real image: put it in src/assets and import it, or use a URL. */
export const products = [
  {
    id: 'product-01',
    name: 'Product 01',
    status: 'Coming Soon',
    icon: Cpu,
    image: '',
    description: 'An intelligent technology solution designed to solve a real-world problem.',
    benefits: [
      'Solves a real, practical problem',
      'Smart, connected and reliable',
      'Designed for everyday use',
    ],
    specs: [
      { label: 'Category', value: 'To be announced' },
      { label: 'Connectivity', value: 'To be announced' },
      { label: 'Availability', value: 'Coming Soon' },
    ],
  },
  {
    id: 'product-02',
    name: 'Product 02',
    status: 'Coming Soon',
    icon: ScanEye,
    image: '',
    description: 'A smart, AI-powered system built to make everyday operations simpler and safer.',
    benefits: [
      'Learns and improves over time',
      'Easy to set up and manage',
      'Built for real-world conditions',
    ],
    specs: [
      { label: 'Category', value: 'To be announced' },
      { label: 'Connectivity', value: 'To be announced' },
      { label: 'Availability', value: 'Coming Soon' },
    ],
  },
  {
    id: 'product-03',
    name: 'Product 03',
    status: 'Coming Soon',
    icon: CircuitBoard,
    image: '',
    description: 'An intelligent hardware platform engineered for reliability, efficiency and scale.',
    benefits: [
      'Efficient, low-power design',
      'Works with cloud and edge',
      'Scales from pilot to production',
    ],
    specs: [
      { label: 'Category', value: 'To be announced' },
      { label: 'Connectivity', value: 'To be announced' },
      { label: 'Availability', value: 'Coming Soon' },
    ],
  },
];

/* ─────────────  ABOUT US  ───────────── */
export const beliefs = [
  { title: 'Innovation', icon: Lightbulb, text: 'Curiosity first. We explore new ideas and turn them into working technology.' },
  { title: 'Accessibility', icon: Accessibility, text: 'Great technology should be within reach of everyone who needs it.' },
  { title: 'Sustainability', icon: Leaf, text: 'We build efficient solutions that respect people and the planet.' },
  { title: 'Practical Technology', icon: Wrench, text: 'If it does not solve a real problem, it is not finished.' },
  { title: 'Customer-Focused Development', icon: HeartHandshake, text: 'Your challenge shapes every decision we make while building.' },
];

export const techAreas = [
  {
    title: 'AI',
    icon: BrainCircuit,
    text: 'Machine learning, deep learning, computer vision and language models that turn data into decisions.',
    tags: ['Machine Learning', 'Computer Vision', 'NLP'],
  },
  {
    title: 'IoT',
    icon: Wifi,
    text: 'Sensors, smart hardware, edge devices and connected systems for real-time monitoring and control.',
    tags: ['Smart Hardware', 'Edge', 'Automation'],
  },
  {
    title: 'Software',
    icon: Code2,
    text: 'Cloud platforms, dashboards, apps and integrations that make intelligent systems easy to use.',
    tags: ['Cloud', 'Web & Mobile', 'Integrations'],
  },
];

export const aboutText = {
  who: [
    'JUPRA is a technology startup focused on turning real-world problems into smart, practical solutions. We combine artificial intelligence, the Internet of Things, automation and intelligent hardware to build systems that people and organisations can actually rely on.',
    'From a first idea to a working prototype and a finished product, we work closely with individuals, businesses and institutions to design technology that fits their needs.',
  ],
  mission:
    'To make intelligent technology practical and accessible — by transforming everyday challenges into reliable, innovative solutions that create real value.',
  vision:
    'To become a trusted name in smart technology, known for products and systems that improve how people live, work and grow.',
};

/* ─────────────  TEAM  (replace names / photos when ready)  ───────────── */
export const teamMembers = [
  { role: 'Co-founder', icon: Crown, name: '', photo: '', linkedin: '' },
  { role: 'Technical Lead', icon: Workflow, name: '', photo: '', linkedin: '' },
  { role: 'Hardware Engineer', icon: CircuitBoard, name: '', photo: '', linkedin: '' },
  { role: 'Software Developer', icon: Code2, name: '', photo: '', linkedin: '' },
  { role: 'AI Engineer', icon: Microscope, name: '', photo: '', linkedin: '' },
  { role: 'Business / Marketing Team', icon: Megaphone, name: '', photo: '', linkedin: '' },
];

/* ─────────────  CONTACT / GET STARTED  ───────────── */
export const requirementTypes = [
  'AI Solution', 'IoT Solution', 'Hardware', 'Automation',
  'Software', 'Research & Development', 'Prototype', 'Other',
];

export const startPaths = [
  { key: 'idea', title: 'I have an idea', action: 'Help me develop it', icon: Lightbulb },
  { key: 'problem', title: 'I have a problem', action: 'Help me find a technology solution', icon: Puzzle },
  { key: 'prototype', title: 'I need a prototype', action: 'Help me build a prototype', icon: Boxes },
  { key: 'product', title: 'I need a product', action: 'Help me develop a product', icon: Rocket },
  { key: 'custom', title: 'I need a customized system', action: "Let's discuss my requirements", icon: Settings2 },
  { key: 'collab', title: 'I want to collaborate', action: "Let's explore collaboration", icon: Handshake },
];

/* ─────────────  FOOTER  ───────────── */
export const footerCompany = [
  { label: 'About Us', to: '/about' },
  { label: 'Founder', to: '/team' },
  { label: 'Contact', to: '/contact' },
];
export const footerSolutions = [
  'Artificial Intelligence', 'IoT & AIoT', 'Smart Hardware',
  'Automation', 'Smart Infrastructure', 'Industry Solutions',
].map((label) => ({ label, to: '/#what-we-do' }));

export const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
];

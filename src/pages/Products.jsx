import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import ProductVisual from '../components/ProductVisual';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { products } from '../data/content';

export default function Products() {
  return (
    <>
      <PageHero
        crumb="Products"
        eyebrow="Our Products"
        title={<>Intelligent products for <span className="text-grad nowrap">real-world</span> <span className="text-grad">problems</span></>}
        lede="Every JUPRA product is designed to solve a specific, practical problem — combining smart hardware, AI and software into one reliable solution."
      />

      <section className="section section--tight">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="Featured Products"
            title="What we are building"
            lede="Our first products are in development. Reach out to be among the first to know."
          />

          <div className="grid grid--3 grid--odd">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1} className="card card--product">
                <div className="card__media">
                  <ProductVisual product={p} />
                  <span className="badge"><i /> {p.status}</span>
                </div>

                <div className="card__body">
                  <h3>{p.name}</h3>
                  <p className="card__desc">{p.description}</p>

                  <h4 className="mini-title">Benefits</h4>
                  <ul className="ticks ticks--sm">
                    {p.benefits.map((b) => (
                      <li key={b}><Check size={15} strokeWidth={3} />{b}</li>
                    ))}
                  </ul>

                  <h4 className="mini-title">Specifications</h4>
                  <dl className="specs">
                    {p.specs.map((s) => (
                      <div key={s.label}>
                        <dt>{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="card__foot">
                  <Link to={`/contact?product=${encodeURIComponent(p.name)}`} className="btn btn-primary btn-block">
                    <span>Contact Us</span>
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="note-bar">
            <div>
              <h3>Looking for something specific?</h3>
              <p>We also build customized systems and prototypes around your requirements.</p>
            </div>
            <Link to="/get-started" className="btn btn-ghost">
              <span>Get Started</span>
              <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import mark from '../assets/jupra-mark.svg';

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container notfound__in">
        <img src={mark} alt="" className="notfound__mark" />
        <span className="eyebrow">Error 404</span>
        <h1 className="page-title">This page drifted out of orbit</h1>
        <p className="page-lede">The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn btn-primary">
          <span>Back to Home</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

/** Product image, or an elegant placeholder when no image is set yet. */
export default function ProductVisual({ product }) {
  const Icon = product.icon;
  if (product.image) {
    return <img src={product.image} alt={product.name} className="pv__img" loading="lazy" />;
  }
  return (
    <div className="pv" aria-hidden="true">
      <span className="pv__ring pv__ring--1" />
      <span className="pv__ring pv__ring--2" />
      <span className="pv__ring pv__ring--3" />
      <span className="pv__core"><Icon size={34} strokeWidth={1.6} /></span>
    </div>
  );
}

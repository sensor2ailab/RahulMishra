"use client";

export default function PageBanner({ title, subtitle }) {
  return (
    <section className="page-banner">
      <div className="page-banner-overlay">
        <div className="page-banner-content">
          <h1>{title}</h1>

          <div className="page-banner-line"></div>

          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

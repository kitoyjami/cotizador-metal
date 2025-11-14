// src/components/layout/PageWrapper.jsx
function PageWrapper({ orientation = 'portrait', children }) {
  const classes =
    orientation === 'landscape'
      ? 'page page-landscape'
      : 'page page-portrait';

  return (
    <div className="page-shell">
      <section className={classes}>
        <div className="page-pad">
          {children}
        </div>
      </section>
    </div>
  );
}

export default PageWrapper;

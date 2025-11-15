// src/components/quote/BrandBlock.jsx
function BrandBlock() {
  return (
    <div className="brand">
      <img
        className="logo"
        src="https://res.cloudinary.com/dtkojle4f/image/upload/v1762536463/logo_1_bjiya7.png"
        alt="Logo Metalstruct"
      />
      <div className="title">
        <h1>METALSTRUCT INGENIERÍA Y DISEÑO DE PROYECTOS E.I.R.L.</h1>
        <p>RUC: 20610583335 · CAL. San Martín N° 1897 – El Porvenir, Trujillo</p>
        <p>
          <a href="mailto:eurbano@metalstructingenieria.com">
            eurbano@metalstructingenieria.com
          </a>
          {' · '}
          <a href="tel:+51955588890">+51 955 588 890</a>
        </p>
      </div>
    </div>
  );
}

export default BrandBlock;

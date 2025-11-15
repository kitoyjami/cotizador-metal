// src/components/quote/SignatureBlock.jsx

const SIGNATURE_URL =
  "https://res.cloudinary.com/dtkojle4f/image/upload/v1762624089/FIRMA_e2oola.png";

function SignatureBlock() {
  return (
    <section className="signature-block">
      <p className="signature-by">Atentamente,</p>
      <p className="signature-company">
        METALSTRUCT INGENIERÍA Y DISEÑO DE PROYECTOS E.I.R.L.
      </p>
      <p className="signature-ruc">RUC: 20610583335</p>

      <div className="signature-area">
        <img src={SIGNATURE_URL} alt="Firma" className="signature-img" />
        <div className="signature-line" />
        <div className="signature-label">Representante</div>
      </div>
    </section>
  );
}

export default SignatureBlock;

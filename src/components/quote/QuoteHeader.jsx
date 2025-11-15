// src/components/quote/QuoteHeader.jsx
function QuoteHeader({ header, onChange }) {
  const handleChange = field => e => {
    onChange(field, e.target.value);
  };

  return (
    <div className="quote-box">
      <div className="q-title">COTIZACIÓN</div>
      <div className="q-grid">
        <div className="lbl">N°</div>
        <div>
          <input
            className="line"
            value={header.number}
            onChange={handleChange('number')}
          />
        </div>

        <div className="lbl">Fecha</div>
        <div>
          <input
            className="line"
            value={header.date}
            onChange={handleChange('date')}
          />
        </div>

        <div className="lbl">Moneda</div>
        <div>
          <select
            className="line"
            value={header.currency}
            onChange={handleChange('currency')}
          >
            <option value="PEN">PEN — Soles (S/)</option>
            <option value="USD">USD — Dólares ($)</option>
          </select>
        </div>

        <div className="lbl">Validez</div>
        <div>
          <input
            className="line"
            value={header.validity}
            onChange={handleChange('validity')}
          />
        </div>
      </div>
    </div>
  );
}

export default QuoteHeader;

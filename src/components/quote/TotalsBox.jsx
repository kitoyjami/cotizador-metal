// src/components/quote/TotalsBox.jsx

function TotalsBox({ items, currency, igvRate = 0.18 }) {
  // Suma de subtotales
  const subtotal = items.reduce((acc, it) => {
    const qty = parseFloat(it.qty || '0') || 0;
    const pu = parseFloat(it.unitPrice || '0') || 0;
    return acc + qty * pu;
  }, 0);

  const igv = subtotal * igvRate;
  const total = subtotal + igv;

  const formatMoney = (amount, cur) => {
    const val = Number(amount) || 0;

    if (cur === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
    }

    // PEN por defecto
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <section className="totals-box">
      <div className="totals-row">
        <div className="totals-label">Sub total</div>
        <div className="totals-value">
          {formatMoney(subtotal, currency)}
        </div>
      </div>
      <div className="totals-row">
        <div className="totals-label">IGV ({Math.round(igvRate * 100)}%)</div>
        <div className="totals-value">
          {formatMoney(igv, currency)}
        </div>
      </div>
      <div className="totals-row totals-row-grand">
        <div className="totals-label">TOTAL</div>
        <div className="totals-value">
          {formatMoney(total, currency)}
        </div>
      </div>
    </section>
  );
}

export default TotalsBox;

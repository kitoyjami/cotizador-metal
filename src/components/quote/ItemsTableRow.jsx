// src/components/quote/ItemsTableRow.jsx
import { useRef, useEffect } from 'react';

function ItemsTableRow({ index, item, onChange, currency }) {
  const descRef = useRef(null);

  const handleChange = (field) => (e) => {
    onChange(item.id, field, e.target.value);
  };

  // auto-altura de la descripción
  const autoGrow = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleDescInput = (e) => {
    autoGrow(e.target);
    handleChange('description')(e);
  };

  useEffect(() => {
    if (descRef.current) {
      autoGrow(descRef.current);
    }
  }, [item.description]);

  // Cálculo y formato de subtotal
  const qty = parseFloat(item.qty || '0') || 0;
  const pu = parseFloat(item.unitPrice || '0') || 0;
  const subtotal = qty * pu;

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
    <tr>
      <td className="ta-c">{index}</td>

      <td>
        <textarea
          ref={descRef}
          className="line desc"
          value={item.description}
          placeholder="Descripción del ítem"
          onInput={handleDescInput}
        />
      </td>

      <td>
        <input
          className="line"
          value={item.um}
          onChange={handleChange('um')}
        />
      </td>

      <td>
        <input
          className="line num"
          value={item.qty}
          onChange={handleChange('qty')}
        />
      </td>

      <td>
        <input
          className="line num"
          value={item.unitPrice}
          onChange={handleChange('unitPrice')}
        />
      </td>

      <td className="ta-r sub">
        {formatMoney(subtotal, currency)}
      </td>
    </tr>
  );
}

export default ItemsTableRow;

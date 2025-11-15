// src/components/quote/ConditionsBlock.jsx
import { useEffect, useRef } from 'react';

function ConditionsBlock({
  conditions,
  onConditionChange,
  onAddCondition,
  onRemoveCondition,
}) {
  const refs = useRef([]);

  // Auto-ajusta la altura de los textareas cuando cambian las condiciones
  useEffect(() => {
    refs.current.forEach((el) => {
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    });
  }, [conditions]);

  const handleChange = (idx, e) => {
    const el = e.target;
    // auto-resize mientras escribes
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
    onConditionChange(idx, el.value);
  };

  return (
    <section className="conditions-sign-section">
      {/* Bloque de condiciones */}
      <div className="conditions-block">
        <h3 className="display conditions-title">Condiciones comerciales</h3>

        <ul className="conditions-list">
          {conditions.map((text, idx) => (
            <li key={idx} className="conditions-item">
              <textarea
                ref={(el) => (refs.current[idx] = el)}
                className="line cond-textarea"
                value={text}
                onChange={(e) => handleChange(idx, e)}
                placeholder="Nueva condición comercial"
              />
              <button
                type="button"
                className="cond-del-btn no-print"
                onClick={() => onRemoveCondition(idx)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="conditions-add-btn no-print"
          onClick={onAddCondition}
        >
          + Añadir condición
        </button>
      </div>
      {/* La firma se pinta aparte en <SignatureBlock /> */}
    </section>
  );
}

export default ConditionsBlock;

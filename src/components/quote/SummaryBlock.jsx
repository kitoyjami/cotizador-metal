// src/components/quote/SummaryBlock.jsx
import { useRef, useEffect } from 'react';

function SummaryBlock({ value, onChange }) {
  const textareaRef = useRef(null);

  const autoGrow = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleInput = (e) => {
    const el = e.target;
    autoGrow(el);
    onChange(el.value);
  };

  // Ajustar altura cuando cambie el valor inicial o venga de backend
  useEffect(() => {
    if (textareaRef.current) {
      autoGrow(textareaRef.current);
    }
  }, [value]);

  return (
    <section className="card summary-card">
      <h3 className="display" style={{ marginBottom: '4mm' }}>Resumen</h3>
      <textarea
        ref={textareaRef}
        className="line"
        placeholder="Breve descripción del alcance"
        value={value}
        onInput={handleInput}
      />
    </section>
  );
}

export default SummaryBlock;

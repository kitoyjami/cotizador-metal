// src/components/quote/PartyCard.jsx
import { Fragment } from 'react';

function PartyCard({ title, fields, onFieldChange }) {
  const handleChange = (id) => (e) => {
    onFieldChange?.(id, e.target.value);
  };

  const handleAutoGrow = (e) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className="card">
      <h3 className="display">{title}</h3>
      <dl className="dl">
        {fields.map((field) => (
          <Fragment key={field.id}>
            <dt>{field.label}</dt>
            <dd>
              {field.editable ? (
                field.multiline ? (
                  <textarea
                    className="line"
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={handleChange(field.id)}
                    onInput={handleAutoGrow}
                    rows={1}
                  />
                ) : (
                  <input
                    className="line"
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={handleChange(field.id)}
                  />
                )
              ) : (
                <span>{field.value}</span>
              )}
            </dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
}

export default PartyCard;

// src/pages/QuoteEditorPage.jsx
import { useState } from 'react';
import FabStack from '../components/layout/FabStack.jsx';
import BrandBlock from '../components/quote/BrandBlock.jsx';
import QuoteHeader from '../components/quote/QuoteHeader.jsx';
import PartyCard from '../components/quote/PartyCard.jsx';
import SummaryBlock from '../components/quote/SummaryBlock.jsx';
import TotalsBox from '../components/quote/TotalsBox.jsx';
import ConditionsBlock from '../components/quote/ConditionsBlock.jsx';
import SignatureBlock from '../components/quote/SignatureBlock.jsx';

// Paginador (interno se encarga de llamar a ItemsTable)
import QuotePages from '../components/pagination/QuotePages.jsx';

function QuoteEditorPage({ orientation = 'portrait' }) {
  /* =======================================================
     ENCABEZADO
     ======================================================= */
  const [header, setHeader] = useState({
    number: 'COT-001-2025',
    date: new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    currency: 'PEN',
    validity: '10 días útiles',
  });

  const handleHeaderChange = (field, value) => {
    setHeader(prev => ({ ...prev, [field]: value }));
  };

  /* =======================================================
     CLIENTE
     ======================================================= */
  const [client, setClient] = useState({
    name: 'GOBIERNO REGIONAL LA LIBERTAD – PROYECTO CHAVIMOCHIC',
    ruc: '20440374248',
    contact: '',
  });

  const handleClientChange = (field, value) => {
    setClient(prev => ({ ...prev, [field]: value }));
  };

  /* =======================================================
     RESUMEN
     ======================================================= */
  const [summary, setSummary] = useState(
    'Suministro de planchas de acero inoxidable AISI 316 según ASTM A240/A240M. Incluye IGV y entrega en obra.'
  );

  /* =======================================================
     CONDICIONES COMERCIALES
     ======================================================= */
  const [conditions, setConditions] = useState([
    'Plazo de entrega: 10 días calendario.',
    'Tipo de pago: Contado / Crédito a 10 días.',
    'Precios incluyen IGV. Validez: 10 días útiles.',
    'Lugar de entrega: según alcance del proyecto.',
  ]);

  const handleConditionChange = (index, value) => {
    setConditions(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleAddCondition = () => {
    setConditions(prev => [...prev, 'Nueva condición comercial']);
  };

  const handleRemoveCondition = (index) => {
    setConditions(prev => prev.filter((_, i) => i !== index));
  };

  /* =======================================================
     PROVEEDOR
     ======================================================= */
  const supplierFields = [
    {
      id: 'razon',
      label: 'Razón social',
      value: 'METALSTRUCT INGENIERÍA Y DISEÑO DE PROYECTOS E.I.R.L.',
      editable: false,
    },
    { id: 'ruc', label: 'RUC', value: '20610583335', editable: false },
    {
      id: 'dir',
      label: 'Dirección',
      value: 'CAL. San Martín N° 1897 – El Porvenir, Trujillo',
      editable: false,
    },
    {
      id: 'mail',
      label: 'Correo',
      value: 'eurbano@metalstructingenieria.com',
      editable: false,
    },
    {
      id: 'tel',
      label: 'Teléfono',
      value: '+51 955 588 890',
      editable: false,
    },
  ];

  /* =======================================================
     CAMPOS CLIENTE
     ======================================================= */
  const clientFields = [
    {
      id: 'name',
      label: 'Razón social',
      value: client.name,
      editable: true,
      multiline: true,
      placeholder: 'Nombre de la empresa / entidad',
    },
    {
      id: 'ruc',
      label: 'RUC',
      value: client.ruc,
      editable: true,
      multiline: false,
      placeholder: 'RUC del cliente',
    },
    {
      id: 'contact',
      label: 'Contacto',
      value: client.contact,
      editable: true,
      multiline: true,
      placeholder: 'Nombre / Cargo / Email',
    },
  ];

  /* =======================================================
     ÍTEMS
     ======================================================= */
  const [items, setItems] = useState([
    {
      id: 1,
      description:
        'PLANCHA DE ACERO INOX AISI 316 ACABADO N1 — 1/2" x 5\' x 10\' (1500 x 3000 mm). Norma: ASTM A240/A240M. Certificación: 3.1 EN 10204.',
      um: 'UND',
      qty: '3',
      unitPrice: '11807.38',
    },
  ]);

  const handleItemChange = (id, field, value) => {
    setItems(prev =>
      prev.map(it => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const handleAddRow = () => {
    setItems(prev => {
      const nextId = prev.length ? Math.max(...prev.map(it => it.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: nextId,
          description: '',
          um: 'UND',
          qty: '1',
          unitPrice: '0.00',
        },
      ];
    });
  };

  const handleDelRow = () => {
    setItems(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleClearAll = () => {
    setItems([
      {
        id: 1,
        description: '',
        um: 'UND',
        qty: '1',
        unitPrice: '0.00',
      },
    ]);
  };

  /* =======================================================
     IMPRESIÓN
     ======================================================= */
  const handlePrint = () => {
    window.print();
  };

  /* =======================================================
     RENDER
     ======================================================= */
  return (
    <>
      {/* FAB flotantes (no afectan layout A4) */}
      <FabStack
        onPrint={handlePrint}
        onAddRow={handleAddRow}
        onDelRow={handleDelRow}
        onClearAll={handleClearAll}
      />

      {/* Contenedor general: mantiene .quote-page para tus selectores */}
      <div className="quote-page">
        <QuotePages
          items={items}
          onItemChange={handleItemChange}
          currency={header.currency}
          orientation={orientation}
          /* Slot: contenido que va SOLO en la primera página */
          headerSlot={
            <>
              <header className="head">
                <BrandBlock />
                <QuoteHeader header={header} onChange={handleHeaderChange} />
              </header>

              <div className="bar" />

              {/* Proveedor / Cliente */}
              <section className="grid-2">
                <PartyCard title="Proveedor" fields={supplierFields} />
                <PartyCard
                  title="Cliente"
                  fields={clientFields}
                  onFieldChange={handleClientChange}
                />
              </section>

              {/* Resumen */}
              <SummaryBlock value={summary} onChange={setSummary} />
            </>
          }
          /* Totales: solo en la ÚLTIMA página */
          totalsSlot={<TotalsBox items={items} currency={header.currency} />}
          /* Condiciones + Firma: solo en la ÚLTIMA página */
          footerSlot={
            <section className="conditions-sign-section">
              <ConditionsBlock
                conditions={conditions}
                onConditionChange={handleConditionChange}
                onAddCondition={handleAddCondition}
                onRemoveCondition={handleRemoveCondition}
              />
              <SignatureBlock />
            </section>
          }
        />
      </div>
    </>
  );
}

export default QuoteEditorPage;

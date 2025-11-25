// src/components/pagination/QuotePages.jsx
import ItemsTable from '../quote/ItemsTable.jsx';

/**
 * QuotePages
 *
 * - Crea tantas páginas A4 como sean necesarias.
 * - Pone el encabezado / resumen SOLO en la primera página.
 * - Divide la tabla de ítems entre páginas.
 * - Pone totales + condiciones + firma SOLO en la última página.
 *
 * Respeta:
 *   .page, .page-pad, .table-wrap, .items, etc.
 */

function QuotePages({
  items,
  onItemChange,
  currency,
  orientation = 'portrait',
  headerSlot,  // contenido solo primera página
  totalsSlot,  // TotalsBox
  footerSlot,  // condiciones + firma
}) {
  // ===== Parámetros de paginación (ajustables) =====
  // Primera página tiene menos espacio útil (encabezado + resumen)
  const PAGINATION_CONFIG = {
    portrait: { first: 10, other: 18 },
    landscape: { first: 14, other: 24 },
  };

  const { first: ROWS_FIRST_PAGE, other: ROWS_OTHER_PAGES } =
    PAGINATION_CONFIG[orientation] || PAGINATION_CONFIG.portrait;

  // ===== Particionamos items en páginas =====
  const pages = [];
  let index = 0;
  let offset = 0; // para numeración continua (Ítem 1, 2, 3, ...)

  while (index < items.length) {
    const capacity = pages.length === 0 ? ROWS_FIRST_PAGE : ROWS_OTHER_PAGES;
    const slice = items.slice(index, index + capacity);

    pages.push({
      items: slice,
      offset, // cuántos ítems hay antes de esta página
    });

    index += capacity;
    offset += slice.length;
  }

  // Si no hay items, aseguramos una página vacía
  if (pages.length === 0) {
    pages.push({ items: [], offset: 0 });
  }

  return (
    <div id="pages" className={`pages-shell pages-${orientation}`}>
      {pages.map((page, pageIndex) => {
        const isFirst = pageIndex === 0;
        const isLast = pageIndex === pages.length - 1;

        return (
          <div className="page-shell" key={pageIndex}>
            <section className={`page page-${orientation}`}>
              <div className="page-pad">
                {/* ===== Encabezado solo en la primera página ===== */}
                {isFirst && headerSlot}

                {/* ===== Tabla de ítems (en todas las páginas) ===== */}
                <ItemsTable
                  items={page.items}
                  onItemChange={onItemChange}
                  currency={currency}
                  itemOffset={page.offset}
                  title={isFirst ? 'Detalle económico' : 'Detalle económico (cont.)'}
                />

                {/* ===== Totales + Condiciones + Firma solo en la última ===== */}
                {isLast && totalsSlot}
                {isLast && footerSlot}
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}

export default QuotePages;

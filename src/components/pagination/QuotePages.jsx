// src/components/pagination/QuotePages.jsx
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
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
  const measureRef = useRef(null);
  const [metrics, setMetrics] = useState(null);

  // Mide alturas reales de cada sección para paginar por altura total de la hoja
  useLayoutEffect(() => {
    const node = measureRef.current;
    if (!node) return;

    const pad = node.querySelector('[data-measure="pad"]');
    const header = node.querySelector('[data-measure="header"]');
    const totals = node.querySelector('[data-measure="totals"]');
    const footer = node.querySelector('[data-measure="footer"]');
    const tableWrap = node.querySelector('[data-measure="tablewrap"]');
    const rows = tableWrap?.querySelectorAll('tbody tr');

    if (!pad || !tableWrap || !rows) return;

    const padHeight = pad.getBoundingClientRect().height;
    const headerHeight = header?.getBoundingClientRect().height || 0;
    const totalsHeight = totals?.getBoundingClientRect().height || 0;
    const footerHeight = footer?.getBoundingClientRect().height || 0;

    const rowHeights = Array.from(rows).map((row) =>
      row.getBoundingClientRect().height,
    );

    const rowsTotalHeight = rowHeights.reduce((acc, h) => acc + h, 0);
    const tableWrapHeight = tableWrap.getBoundingClientRect().height;
    // Todo lo que no sean filas (título, thead, márgenes) se cuenta como altura fija
    const tableFixedHeight = Math.max(tableWrapHeight - rowsTotalHeight, 0);

    setMetrics({
      padHeight,
      headerHeight,
      totalsHeight,
      footerHeight,
      tableFixedHeight,
      rowHeights,
    });
  }, [items, orientation, headerSlot, totalsSlot, footerSlot]);

  const pages = useMemo(() => {
    if (!metrics) return [{ items, offset: 0 }];
    const {
      padHeight,
      headerHeight,
      totalsHeight,
      footerHeight,
      tableFixedHeight,
      rowHeights,
    } = metrics;

    const result = [];
    let cursor = 0;
    let offset = 0;

    while (cursor < rowHeights.length) {
      const isFirst = result.length === 0;
      const rowsLeft = rowHeights.length - cursor;
      let available = padHeight;

      if (isFirst) {
        available -= headerHeight;
      }

      // Altura fija de la tabla por página (título, thead, márgenes)
      available -= tableFixedHeight;

      const rowsForPage = [];

      for (let i = 0; i < rowsLeft; i += 1) {
        const rowHeight = rowHeights[cursor + i];
        const isLastRow = cursor + i + 1 === rowHeights.length;
        const required =
          rowHeight + (isLastRow ? totalsHeight + footerHeight : 0);

        if (required <= available) {
          rowsForPage.push(cursor + i);
          available -= rowHeight;
        } else {
          break;
        }
      }

      // Si por reserva de totales/footers no cupo ninguno, forzamos 1 fila
      if (rowsForPage.length === 0) {
        rowsForPage.push(cursor);
        cursor += 1;
      } else {
        cursor = rowsForPage[rowsForPage.length - 1] + 1;
      }

      const slice = items.slice(
        rowsForPage[0],
        rowsForPage[rowsForPage.length - 1] + 1,
      );

      result.push({
        items: slice,
        offset,
      });

      offset += slice.length;
    }

    if (result.length === 0) {
      result.push({ items: [], offset: 0 });
    }

    return result;
  }, [items, metrics]);

  return (
    <div id="pages" className={`pages-shell pages-${orientation}`}>
      {/* Medidor oculto para calcular alturas reales */}
      <div className="page-shell page-shell-measure" aria-hidden>
        <section className={`page page-${orientation}`}>
          <div className="page-pad" data-measure="pad" ref={measureRef}>
            {headerSlot && <div data-measure="header">{headerSlot}</div>}

            <div data-measure="tablewrap">
              <ItemsTable
                items={items}
                onItemChange={() => {}}
                currency={currency}
                itemOffset={0}
                title="Detalle económico"
              />
            </div>

            {(totalsSlot || footerSlot) && (
              <div data-measure="totals-footer">
                {totalsSlot && <div data-measure="totals">{totalsSlot}</div>}
                {footerSlot && <div data-measure="footer">{footerSlot}</div>}
              </div>
            )}
          </div>
        </section>
      </div>

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

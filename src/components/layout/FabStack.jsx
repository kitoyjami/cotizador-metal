// src/components/layout/FabStack.jsx

function FabStack({
  onPreview,     // toggle vista previa
  onPrint,       // imprimir
  onAddRow,      // añadir fila
  onDelRow,      // eliminar última fila
  onClearAll,    // limpiar tabla
}) {
  return (
    <div className="fab-stack no-print">
      {/* Principal: PDF */}
      <button
        type="button"
        className="fab-main"
        title="Exportar PDF"
        onClick={onPrint}
      >
        PDF
      </button>

      {/* Vista previa */}
      <button
        type="button"
        className="fab-mini"
        title="Vista previa"
        onClick={onPreview}
      >
        👁️
      </button>

      {/* Filas de la tabla */}
      <button
        type="button"
        className="fab-mini"
        title="Agregar fila"
        onClick={onAddRow}
      >
        ＋
      </button>

      <button
        type="button"
        className="fab-mini"
        title="Eliminar última fila"
        onClick={onDelRow}
      >
        −
      </button>

      <button
        type="button"
        className="fab-mini"
        title="Limpiar todo"
        onClick={onClearAll}
      >
        🗑️
      </button>
    </div>
  );
}

export default FabStack;

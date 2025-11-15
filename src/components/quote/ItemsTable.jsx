// src/components/quote/ItemsTable.jsx
import ItemsTableRow from './ItemsTableRow.jsx';

function ItemsTable({ items, onItemChange, currency }) {
  return (
    <section className="table-wrap">
      <h3 className="table-title">Detalle económico</h3>
      <table className="items">
        <colgroup>
          <col className="w-item" />
          <col />
          <col className="w-um" />
          <col className="w-cant" />
          <col className="w-pu" />
          <col className="w-sub" />
        </colgroup>
        <thead>
          <tr>
            <th className="ta-c">Ítem</th>
            <th>Descripción</th>
            <th className="ta-c">UM</th>
            <th className="ta-c">Cant.</th>
            <th className="ta-c">P. Unit</th>
            <th className="ta-c">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <ItemsTableRow
              key={it.id}
              index={idx + 1}
              item={it}
              currency={currency}
              onChange={onItemChange}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ItemsTable;

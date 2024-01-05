import scss from "./Table.module.scss";

export default function Table({ data, columns = [], name, onClickRow=() => {}, color} = {}) {
  return (
    <>
      {data?.length > 0 && (
        <div className={scss.tableContainer}>
          <h3 style={{background: color}}>{name}</h3>
          <table className={scss.table}>
            <thead>
              <tr>
                {columns.map((v, i) => (
                  <th key={name + i} className={scss.headerCell}>
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((r, ri) => {
                return (
                  <tr key={"tr-"+ri+name} className={scss.bodyRow} onClick={() => onClickRow(r)}>
                    {columns.map((k, i) => (
                      <td key={r.id + name + i} className={scss.bodyCell}>
                        {r[k]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
      )}
    </>
  );
}

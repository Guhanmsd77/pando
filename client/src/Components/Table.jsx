import '../styles/Table.css';


const Table =  ({columns,data}) => {
    return(
        <table className="data-table">
            <thead className='table-heading'>
                <tr>
                    {columns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody className='table-data'>
                {data.map((row) => (
                    <tr key={row}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;
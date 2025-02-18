// Load JSON data

export default function BookTemplate( {data}) {
  return (
    <div>
      <h2>Autor: {data[0].author}</h2>
      <h2>Título: {data[0].title}</h2>
      <h3>Capítulo: {data[0].chapter}</h3>
      <h4>Sección: {data[0].section}</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid black' }}>Números de línea</th>
            <th style={{ padding: '10px', border: '1px solid black' }}>Original</th>
            <th style={{ padding: '10px', border: '1px solid black' }}>Traducción</th>
            <th style={{ padding: '10px', border: '1px solid black' }}>Notas</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid black' }}>{entry.lines.join(', ')}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>{entry.greek}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>{entry.spanish}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>{entry.notes || 'No notes available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


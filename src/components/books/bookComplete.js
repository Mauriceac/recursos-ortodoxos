// Load JSON data

export default function BookTemplate({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <p>{item.spanish}</p>
        </div>
      ))}
    </div>
  );
}


import "./index.css";

export default function DayForm({
  day,
  summary_title,
  feasts,
  fast_level_desc,
  fast_exception_desc,
  readings,
}) {
  return (
    <div className="day">
      <div className="dayNumber">{day}</div>
      <div className="fastLevel">{fast_level_desc}</div>
      <div className="fastException">{fast_exception_desc}</div>
      <br />
      <div className="dayTitle">{summary_title}</div>
      <br />
      <div className="feasts">
        {feasts && feasts.map((feast) => <div key={feast}>{feast}</div>)}
        {/* {feasts && feasts[0]} */}
      </div>
      <br />

      {/* <div className="readings">
        {readings.map((reading) => (reading.source === "Epistle" &&
          <div key={reading.short_display}>
            <div><b>Primera lectura:</b> {reading.translation.description !== "" && `(${reading.translation.description})`}</div>
            <div>{reading.translation.display}</div>
          </div>
        ))}
        {readings.map((reading) => (reading.source === "Gospel" &&
          <div key={reading.short_display}>
            <div><b>Evangelio:</b> {reading.translation.description !== "" && `(${reading.translation.description})`}</div>
            <div>{reading.translation.display}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

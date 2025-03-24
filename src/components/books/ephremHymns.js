// Load JSON data
import React from 'react';


export default function BookTemplate({ data }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '40% 40% 20%', gap: '1rem' }}>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div dir="rtl">{item.syriac.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</div>
          <div>{item.spanish.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</div>
          <div style={{ fontSize: '0.8rem' }}>{item.notes}</div>
        </React.Fragment>
      ))}
    </div>
  );
}


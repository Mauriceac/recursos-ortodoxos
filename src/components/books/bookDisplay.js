// Use React to display book in three columns: original text, translation, and notes.

import React from 'react';

export default function BookTemplate({ data }) {
    return (
        <div>
            {data.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    <h2 id={`anchor${section.section}`}>Sección {section.section}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '40% 40% 20%', gap: '1rem' }}>
                        {section.translation.map((item, itemIndex) => (
                            <React.Fragment key={itemIndex}>
                                <div>{item.greek}</div>
                                <div>{item.spanish}</div>
                                <div style={{ fontSize: '0.8rem' }}>{item.notes}</div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function generateTOC(data) {
    return data.map((section) => ({
        value: `Sección ${section.section}`,
        id: `anchor${section.section}`,
        level: 2,
    }));
}
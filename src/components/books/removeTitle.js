// THIS IS FOR FUTURE REFERENCE ONLY
// import ReactDOMServer from "react-dom/server";

// export default function RemoveTitle({data: MDXContent}) {
//     const renderedString = ReactDOMServer.renderToString(<MDXContent />);
//     // Parse and remove the <h1> tag
//     const modifiedContent = renderedString.replace(/<header>.*?<h1.*?>.*?<\/h1>.*?<\/header>/s, "");
//     console.log("Modified Rendered String:", modifiedContent);
    
//     // Return the modified content as HTML
//     return (
//         <div dangerouslySetInnerHTML={{ __html: modifiedContent }} />
//     );
// }
// ----------
import React from 'react';

export default function RemoveTitle({ data: MDXContent }) {
    // Extract the children array from MDXContent
    const childrenArray = MDXContent().props.children;

    // Remove the first item from the array
    const modifiedChildren = childrenArray.slice(1);

    console.log('Modified Children:', modifiedChildren);

    return (
        <div>
            {/* Render the modified children */}
            {modifiedChildren.map((child, index) => (
                <React.Fragment key={index}>{child}</React.Fragment>
            ))}
        </div>
    );
}
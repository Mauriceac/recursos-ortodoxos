const fs = require('fs');
const path = require('path');

const bookName = 'de_caelesti_hierarchia';

const sourceDir = path.join(__dirname, `../databases/books/${bookName}`);
const targetDir = path.join(__dirname, `../../docs/books/${bookName}`);

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const fileName = path.basename(file, '.md.json');
    const match = fileName.match(/chapter_(\d+)_section_(\d+)/);

    if (match) {
      let chapter = match[1];
      let section = match[2];

      // Pad chapter and section with leading zeros if necessary
      chapter = chapter.padStart(2, '0');
      section = section.padStart(2, '0');

      const mdxContent = `---
title: ${chapter}, ${section}
---
import Book from '@site/src/components/books/bookTest.js'
import Content from '@site/src/databases/books/${bookName}/${fileName}.md.json'

<Book data={Content}/>
`;

      // Create chapter directory if it doesn't exist
      const chapterDir = path.join(targetDir, `chapter_${chapter}`);
      if (!fs.existsSync(chapterDir)) {
        fs.mkdirSync(chapterDir, { recursive: true });
      }

      const targetFilePath = path.join(chapterDir, `${section}.mdx`);
      fs.writeFile(targetFilePath, mdxContent, err => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log(`MDX file created: ${targetFilePath}`);
        }
      });
    } else {
      console.error(`File name does not match expected pattern: ${fileName}`);
    }
  });
});
import { useState, useEffect } from "react";
import "./App.css";
import Options from "./components/Options";

function App() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedTranslation, setSelectedTranslation] = useState();
  const [books, setBooks] = useState([]);
  const [bookObject, setBookObject] = useState();
  const [chapter, setChapter] = useState();
  const [chapterText, setChapterText] = useState([]);
  const [verse, setVerse] = useState();

  // const for the original Greek text
  const [originalText, setOriginalText] = useState();
  const [formattedOriginalText, setFormattedOriginalText] = useState("");
  const [originalTranslation, setOriginalTranslation] = useState("");
  const [dictionaryContent, setDictionaryContent] = useState("");
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  // Get list of languages and translations
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://bolls.life/static/bolls/app/views/languages.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setLanguages(data))
      .catch((error) => console.error(error));
  }, []);

  // Get list of books for selected translation
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    selectedTranslation &&
      fetch(
        `https://bolls.life/get-books/${selectedTranslation}/`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => setBooks(JSON.parse(result)))
        .catch((error) => console.error(error));
  }, [selectedTranslation]);

  // Get verses for selected book and chapter
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    selectedTranslation &&
      chapter &&
      bookObject &&
      fetch(
        `https://bolls.life/get-text/${selectedTranslation}/${bookObject.bookid}/${chapter}/`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => setChapterText(JSON.parse(result)))
        .catch((error) => console.error(error));
  }, [bookObject, chapter, selectedTranslation]);

  // Get verses for original Greek text
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    originalTranslation &&
      chapter &&
      bookObject &&
      fetch(
        `https://bolls.life/get-text/${originalTranslation}/${bookObject.bookid}/${chapter}/`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          const originalTextData = JSON.parse(result);
          setOriginalText(originalTextData);

          // Format the original text with strong numbers
          if (verse && (originalTranslation === "TISCH" || originalTranslation === "WLCa")) {
            const verseWithStrong = originalTextData[verse - 1].text;
            const strongNumbers = verseWithStrong
              .match(/<S>(\d+)<\/S>/g)
              .map((s) => s.replace(/<\/?S>/g, ""));
            const words = verseWithStrong
              .split(/<S>\d+<\/S>/g)
              .filter((s) => s.length > 0);
            const wordsWithSpans = words
              .filter((s) => s.trim().length > 0)
              .map((word, i) => {
                const strongNumber = strongNumbers[i];
                return `<span id="${originalTranslation === "TISCH" ? "G" : "H"}${strongNumber}">${word.trim()}</span>`;
              });

            setFormattedOriginalText(wordsWithSpans.join(" "));
          } else if (verse && originalTranslation === "LXX") {
            setFormattedOriginalText(originalTextData[verse - 1].text);
          } else {
            setFormattedOriginalText(originalTextData.map((verseData) => verseData.text).join(" "));
          }
        })
        .catch((error) => console.error(error));
  }, [bookObject, chapter, originalTranslation, verse]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleTranslationChange = (event) => {
    setSelectedTranslation(event.target.value);
  };

  const handleBookChange = (event) => {
    const selectedBook = books.find(
      (book) => book.bookid === Number(event.target.value)
    );
    setBookObject(selectedBook);

    // Set originalTranslation based on bookId
    if (selectedBook.bookid >= 40 && selectedBook.bookid <= 66) {
      setOriginalTranslation("TISCH");
    } else if (selectedBook.bookid >= 1 && selectedBook.bookid <= 39) {
      setOriginalTranslation("WLCa");
    } else if (selectedBook.bookid >= 67) {
      setOriginalTranslation("LXX");
    }
    if (selectedTranslation === "LXXE") {
      setOriginalTranslation("LXX");
    }
  };

  const handleChapterChange = (event) => {
    setChapter(event.target.value);
  };

  const handleVerseChange = (event) => {
    setVerse(event.target.value);
  };

  const getDefinition = (strongNumber) => {
    setDictionaryOpen(false); // Close the dictionary before fetching new definition
    fetch(`https://bolls.life/dictionary-definition/BDBT/${strongNumber}/`)
      .then((response) => response.json())
      .then((data) => {
        let definitionHTML = data[0].definition;

        // Replace 'a href' tags with a call to getDefinition function
        definitionHTML = definitionHTML.replace(
          /<a href=S:(.+?)>/g,
          `<a href='#' onclick='getDefinition("$1")'>`
        );

        setDictionaryContent(definitionHTML);
        setDictionaryOpen(true); // Reopen the dictionary with new definition
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const verseWords = document.querySelectorAll("span");
    verseWords.forEach((word) => {
      word.addEventListener("click", function () {
        const strongNumber = this.id;
        setSelectedWord(this.textContent); // Set the selected word
        getDefinition(strongNumber);
      });
    });
  }, [formattedOriginalText]);

  return (
    <>
      <div className="bibleApp">
        <select
          defaultValue="Select Language"
          onChange={handleLanguageChange}
          className="languageBar"
        >
          <option disabled>Select Language</option>
          {Array.isArray(languages) &&
            languages.map((language, index) => (
              <Options key={index} text={language.language} value={index} />
            ))}
        </select>
        <select
          defaultValue="Select Translation"
          onChange={handleTranslationChange}
          className="translationBar"
        >
          <option>Select Translation</option>
          {languages[selectedLanguage] &&
            languages[selectedLanguage].translations.map((translation) => (
              <Options
                key={translation.short_name}
                value={translation.short_name}
                text={translation.full_name}
              />
            ))}
        </select>
        <select
          defaultValue="Select Book"
          onChange={handleBookChange}
          className="bookBar"
        >
          <option disabled>Select Book</option>
          {selectedTranslation &&
            books.map((book) => (
              <Options key={book.bookid} value={book.bookid} text={book.name} />
            ))}
        </select>
        <select
          onChange={handleChapterChange}
          defaultValue="Select Chapter"
          className="chapterBar"
        >
          <option disabled>Select Chapter</option>
          {bookObject &&
            [...Array(bookObject.chapters).keys()].map((_, index) => (
              <Options key={index} value={index + 1} text={index + 1} />
            ))}
        </select>
        <select
          onChange={handleVerseChange}
          defaultValue="Select Verse"
          className="verseBar"
        >
          <option disabled>Select Verse</option>
          {Array.isArray(chapterText) &&
            chapterText.map((verse) => (
              <Options key={verse.pk} value={verse.verse} text={verse.verse} />
            ))}
        </select>
        <div className="verseDisplay">
          <p
            id="verseText"
            dangerouslySetInnerHTML={{
              __html:
                selectedLanguage &&
                selectedTranslation &&
                bookObject &&
                chapterText &&
                verse &&
                chapterText[verse - 1].text,
            }}
          />
        </div>
        <div className="verseOriginal">
          {/* // Display Original Greek*/}
          <p
            id="originalText"
            dangerouslySetInnerHTML={{
              __html:
                selectedLanguage &&
                selectedTranslation &&
                bookObject &&
                formattedOriginalText &&
                verse &&
                formattedOriginalText,
            }}
          />
        </div>
        <div className="secondaryDisplay">
          
          <div className={`dictionary ${dictionaryOpen ? "open" : "close"}`}>
          <h3>{selectedWord}</h3>
            <div id="definition" dangerouslySetInnerHTML={{ __html: dictionaryContent }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

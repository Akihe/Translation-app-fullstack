import "./App.css";
import React, { useState } from "react";
import TranslationComponent from "./TranslationComponent";

function App() {
  const [database, setDatabase] = useState([]);

  async function fetchButton() {
    let data = await fetch("http://localhost:8080/dictionary");
    let js = await data.json();
    console.log(js);
    setDatabase(js);
  }

  const allQuestions = database.map((question) => {
    return (
      <TranslationComponent
        originalWord={question.word_in_finnish}
        correctTranslation={question.word_in_english}
      />
    );
  });

  return (
    <div className="App">
      <button onClick={fetchButton}>Nouda</button>
      {allQuestions}
    </div>
  );
}

export default App;

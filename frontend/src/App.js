import "./App.css";
import React, { useState } from "react";
import TranslationComponent from "./TranslationComponent";

function App() {
  const [database, setDatabase] = useState([]);

  async function fetchButton() {
    let data = await fetch("http://localhost:8080/locations");
    let js = await data.json();
    setDatabase(js);
  }

  const allQuestions = database.map((question) => {
    return (
      <TranslationComponent
        originalWord={question.latitude}
        correctTranslation={question.longitude}
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

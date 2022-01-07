import React, { useState } from "react";
import TranslationComponent from "./TranslationComponent";

function UserPage() {
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
    <div>
      <h1>This is where you play the game</h1>
      <button onClick={fetchButton}>Nouda</button>
      {allQuestions}
    </div>
  );
}

export default UserPage;

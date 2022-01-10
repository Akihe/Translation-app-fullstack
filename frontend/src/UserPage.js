import React, { useEffect, useState } from "react";
import TranslationComponent from "./TranslationComponent";

function UserPage() {
  const [database, setDatabase] = useState([]);

  async function fetchAll() {
    let data = await fetch("http://localhost:8080/dictionary");
    let js = await data.json();
    console.log(js);
    setDatabase(js);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const allQuestions = database.map((question, index) => {
    return (
      <TranslationComponent
        key={index}
        originalWord={question.word_in_finnish}
        correctTranslation={question.word_in_english}
      />
    );
  });

  return (
    <div>
      <h1>This is where you play the game</h1>
      {allQuestions}
    </div>
  );
}

export default UserPage;

import React, { useState } from "react";

function TranslationComponent({ originalWord, correctTranslation }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  const changeAnswer = (input) => {
    setAnswer(input.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    checkAnswer();
  }

  function checkAnswer() {
    if (answer === correctTranslation.toString()) {
      setResult("Oikein");
      console.log("result asetettu oikein");
    } else if (answer !== correctTranslation.toString()) {
      setResult("Väärin");
    }
  }

  return (
    <div className="words">
      <fetchAll />
      <form onSubmit={handleSubmit}>
        <span>{originalWord}</span>

        <input
          value={answer}
          onChange={changeAnswer}
          placeholder="answer"
        ></input>
        <button type="submit">Update</button>
        <span>{result}</span>
      </form>
    </div>
  );
}

export default TranslationComponent;

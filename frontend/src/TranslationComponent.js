import React, { useState } from "react";

function TranslationComponent({ originalWord, correctTranslation }) {
  const [answer, setAnswer] = useState("");

  const changeAnswer = (input) => {
    setAnswer(input.target.value);
  };

  function handleSubmit() {}

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
      </form>
    </div>
  );
}

export default TranslationComponent;

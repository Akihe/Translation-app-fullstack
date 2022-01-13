import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

function TranslationComponent({
  id,
  originalWord,
  correctTranslation,
  finnishToEnglish,
  correctQuestion,
}) {
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
    if (
      finnishToEnglish &&
      answer.toUpperCase() === correctTranslation.toUpperCase()
    ) {
      setResult("Correct!");
      correctQuestion(true, id);
    } else if (answer.toUpperCase() === originalWord.toUpperCase()) {
      setResult("Correct!");
      correctQuestion(true, id);
    } else {
      setResult("Wrong.");
      correctQuestion(false, id);
    }
  }

  return finnishToEnglish ? (
    <div className="words">
      <form onSubmit={handleSubmit}>
        <span className="originalword">{originalWord}</span>
        <Input
          value={answer}
          onChange={changeAnswer}
          placeholder="answer"
        ></Input>
        <Button variant="contained" type="submit">
          Check Answer
        </Button>
        <span>{result}</span>
      </form>
    </div>
  ) : (
    <div className="words">
      <form onSubmit={handleSubmit}>
        <span className="originalword">{correctTranslation}</span>
        <Input
          value={answer}
          onChange={changeAnswer}
          placeholder="answer"
        ></Input>
        <Button variant="contained" type="submit">
          Check Answer
        </Button>
        <span>{result}</span>
      </form>
    </div>
  );
}

export default TranslationComponent;

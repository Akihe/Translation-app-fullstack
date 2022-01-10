import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

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
    if (answer.toUpperCase() === correctTranslation.toUpperCase()) {
      setResult("Correct!");
      console.log("result asetettu oikein");
    } else {
      setResult("Wrong.");
    }
  }

  return (
    <div className="words">
      <form onSubmit={handleSubmit}>
        <span className="originalword">{originalWord}</span>
        <Input
          value={answer}
          onChange={changeAnswer}
          placeholder="answer"
        ></Input>
        <Button variant="contained" type="submit">
          Update
        </Button>
        <span>{result}</span>
      </form>
    </div>
  );
}

export default TranslationComponent;

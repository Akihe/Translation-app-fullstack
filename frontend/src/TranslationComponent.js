import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

/**
 * @author Aki Helin
 * @version 1.0
 *
 * Component which returns the html elements shown to the user for each word pair.
 * @param {*} params gets all the info from the database plus a function from UserPage.js
 * @returns Html elements to be displayed for the user
 */
function TranslationComponent({
  id,
  originalWord,
  correctTranslation,
  finnishToEnglish,
  correctQuestion,
}) {
  /**
   * Variable for the users answer.
   */
  const [answer, setAnswer] = useState("");

  /**
   * Variable used to set wether the user was correct or not.
   */
  const [result, setResult] = useState("");

  /**
   * Sets the text typed by the user into the answer variable.
   * @param {object} input
   */
  function changeAnswer(input) {
    setAnswer(input.target.value);
  }

  /**
   * Checks the user's answer when submit button is pressed.
   * preventDefault prevents the webpage from reloading when the button is pressed.
   * @param {object} e
   */
  function handleSubmit(e) {
    e.preventDefault();
    checkAnswer();
  }

  /**
   * Checks if the user is translating the words from finnish to english or vice versa,
   * then checks wether the answer is correct or not and sets the result in a useState variable.
   * Calls function correctQuestion which is needed for calculating the total points
   * Sets the words to upper case to ignore case sensitivity
   */
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

  /**
   * Returns the form in finnish to english format or vice versa, depending on how the user wants to play.
   */
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

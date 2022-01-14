import React, { useEffect, useState } from "react";
import TranslationComponent from "./TranslationComponent";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { logDOM } from "@testing-library/react";

/**
 * @author Aki Helin
 * @version 1.0
 *
 * Creates a TranslationComponent for each value fetched from the database, all the displayed elements are brought here.
 * @returns users view.
 */
function UserPage() {
  /**
   * Holds all the records fetched from the database.
   */
  const [database, setDatabase] = useState([]);
  /**
   * Holds the tags selected by user that he wishes to get the questions related to.
   */
  const [selectedTag, setSelectedTags] = useState([]);
  /**
   * Holds all the questions chosen by user, (database filtered based on users tag selection)
   */
  const [chosenQuestions, setChosenQuestions] = useState([]);
  /**
   * Holds the correct answer ids.
   */
  const [correctAnswers, setCorrectAnswers] = useState([]);

  /**
   * Fetches everything from the database
   */
  async function fetchAll() {
    let data = await fetch("/dictionary");
    let js = await data.json();
    setDatabase(js);
  }

  /**
   * UseEffect is called once when the page is opened, used to fetch all the data.
   */
  useEffect(() => {
    fetchAll();
  }, []);

  /**
   * Setting for the dropdown button used to select tags
   */
  const ITEM_HEIGHT = 48;
  /**
   * Setting for the dropdown button used to select tags
   */
  const ITEM_PADDING_TOP = 8;
  /**
   * Settings for the dropdown button used to select tags
   */
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  /**
   * Picks unique tags from every value in the database.
   */
  const categories = [
    ...new Set(
      database.map((question) => {
        return question.tag;
      })
    ),
  ];

  /**
   *
   * Creates a dropdown button with selectable fields used to select tags that you want to get the questions related to.
   * Uses MUI elements, code mostly taken from MUI.
   * @returns a dropdown button with a selectable list.
   */
  function MultipleSelectCheckmarks() {
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedTags(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
    return (
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedTag}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {categories.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={selectedTag.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  /**
   *
   * This gets called when the user submits an answer. Will either set the id of the answer to a useState variable,
   * or removes the id if the answer was wrong.
   *
   * @param {boolean} isCorrect either true or false, based on wether the users answer was correct or not.
   * @param {int} questionId Id of the question that the user wanted to be checked.
   */
  function correctQuestion(isCorrect, questionId) {
    if (isCorrect) {
      setCorrectAnswers((state, props) => {
        const exists = state.some((id) => id === questionId);
        if (exists) {
          return state;
        } else {
          let updateCorrectQs = [...state, questionId];

          return updateCorrectQs;
        }
      });
    } else {
      setCorrectAnswers((state, props) => {
        let updateCorrectQs = state.filter((id) => id !== questionId);
        return updateCorrectQs;
      });
    }
  }

  /**
   * Creates a TranslationComponent for each row that has a tag chosen by the user (the ones the user wants to answer to), fetched from the database.
   * Stores them in a state variable.
   * @param {boolean} finnishToEnglish Based on which way the user wants to translate the words to.
   */
  function selectLanguage(finnishToEnglish) {
    const chooseQuestions = database.map((question, index) => {
      if (selectedTag.includes(question.tag)) {
        return (
          <TranslationComponent
            key={index}
            id={question.id}
            originalWord={question.word_in_finnish}
            correctTranslation={question.word_in_english}
            finnishToEnglish={finnishToEnglish}
            correctQuestion={correctQuestion}
          />
        );
      } else {
        return null;
      }
    });

    //Filter null values to have a clean variable, so we can use for example the length function.
    const finalQuestions = chooseQuestions.filter(
      (question) => question != null
    );
    setChosenQuestions(finalQuestions);
  }

  return (
    <div>
      <h1>Translate O'Matic!</h1>
      <Button variant="outlined" onClick={() => selectLanguage(true)}>
        Play Finnish to English
      </Button>
      <Button variant="outlined" onClick={() => selectLanguage(false)}>
        Play English to Finnish
      </Button>
      <MultipleSelectCheckmarks />
      {chosenQuestions}
      <p>
        Total points {correctAnswers.length} / {chosenQuestions.length}
      </p>
    </div>
  );
}

export default UserPage;

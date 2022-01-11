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

function UserPage() {
  const [database, setDatabase] = useState([]);
  const [selectedTag, setSelectedTags] = useState([]);
  const [chosenQuestions, setChosenQuestions] = useState([]);
  const [correctQuestions, setCorrectQuestions] = useState(0);

  async function fetchAll() {
    let data = await fetch("http://localhost:8080/dictionary");
    let js = await data.json();
    console.log(js);
    setDatabase(js);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const categories = [
    ...new Set(
      database.map((question) => {
        return question.tag;
      })
    ),
  ];

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

  function correctAmount(question) {
    setCorrectQuestions(question);
  }

  function selectLanguage(finnishToEnglish) {
    const chooseQuestions = database.map((question, index) => {
      if (selectedTag.includes(question.tag)) {
        return (
          <TranslationComponent
            key={index}
            originalWord={question.word_in_finnish}
            correctTranslation={question.word_in_english}
            finnishToEnglish={finnishToEnglish}
            correctAmount={correctAmount}
          />
        );
      } else {
        return null;
      }
    });
    const finalQuestions = chooseQuestions.filter(
      (question) => question != null
    );
    setChosenQuestions(finalQuestions);
  }

  return (
    <div>
      <h1>This is where you play the game</h1>
      <Button variant="outlined" onClick={() => selectLanguage(true)}>
        Play Finnish to English
      </Button>
      <Button variant="outlined" onClick={() => selectLanguage(false)}>
        Play English to Finnish
      </Button>
      <MultipleSelectCheckmarks />
      {chosenQuestions}
      <p>
        Total points {correctQuestions} / {chosenQuestions.length}
      </p>
    </div>
  );
}

export default UserPage;

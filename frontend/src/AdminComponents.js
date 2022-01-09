import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TranslationComponent from "./TranslationComponent";

function AdminComponents() {
  const [finnishWord, setFinnishWord] = useState("");
  const [englishWord, setEnglishWord] = useState("");
  const [tag, setTag] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    postToDatabase();
  }

  function handleChange(input, target) {
    if (target === "finnish") {
      setFinnishWord(input.target.value);
    } else if (target === "english") {
      setEnglishWord(input.target.value);
    } else if (target === "tag") {
      setTag(input.target.value);
    }
  }

  function postToDatabase() {
    fetch("http://localhost:8080/dictionary/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word_in_finnish: finnishWord,
        word_in_english: englishWord,
        tag: tag,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="submitNew">
        <form onSubmit={handleSubmit}>
          <Input
            value={finnishWord}
            onChange={(input) => handleChange(input, "finnish")}
            placeholder="In Finnish"
          ></Input>
          <Input
            value={englishWord}
            onChange={(input) => handleChange(input, "english")}
            placeholder="In English"
          ></Input>
          <Input
            value={tag}
            onChange={(input) => handleChange(input, "tag")}
            placeholder="tag"
          ></Input>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminComponents;

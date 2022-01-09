import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import EditComponent from "./EditComponent";

function AdminComponents() {
  const [finnishWord, setFinnishWord] = useState("");
  const [englishWord, setEnglishWord] = useState("");
  const [tag, setTag] = useState("");
  const [database, setDatabase] = useState([]);

  async function fetchButton() {
    let data = await fetch("http://localhost:8080/dictionary");
    let js = await data.json();
    console.log(js);
    setDatabase(js);
  }

  useEffect(() => {
    fetchButton();
  }, []);

  function deleteQuestion() {}

  const allQuestions = database.map((question) => {
    return (
      <EditComponent
        deleteQuestion={deleteQuestion}
        database={database}
        id={question.id}
        originalWord={question.word_in_finnish}
        correctTranslation={question.word_in_english}
        tag={question.tag}
      />
    );
  });

  function handleSubmit(e) {
    e.preventDefault();
    postToDatabase();
    setFinnishWord("");
    setEnglishWord("");
    setTag("");
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
            required
          ></Input>
          <Input
            value={englishWord}
            onChange={(input) => handleChange(input, "english")}
            placeholder="In English"
            required
          ></Input>
          <Input
            value={tag}
            onChange={(input) => handleChange(input, "tag")}
            placeholder="tag"
            required
          ></Input>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
      <div className="flexbox">{allQuestions}</div>
    </div>
  );
}

export default AdminComponents;

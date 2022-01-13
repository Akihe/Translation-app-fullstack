import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import EditComponent from "./EditComponent";

function AdminComponents() {
  const [finnishWord, setFinnishWord] = useState("");
  const [englishWord, setEnglishWord] = useState("");
  const [tag, setTag] = useState("");
  const [database, setDatabase] = useState([]);

  async function fetchAll() {
    let data = await fetch("/dictionary");
    let js = await data.json();
    setDatabase(js);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  async function deleteFromDatabase(id) {
    fetch(`/dictionary/${id}`, {
      method: "DELETE",
    });
  }

  function deleteQuestion(id) {
    console.log(id);
    const filteredQuestions = [...database].filter(
      (question) => question.id !== id
    );
    deleteFromDatabase(id);
    setDatabase(filteredQuestions);
  }

  function editQuestion(id, editedFinnish, editedEnglish, editedTag) {
    let editedDatabase = database.map((q) => {
      if (q.id === id) {
        q = {
          id: id,
          word_in_finnish: editedFinnish,
          word_in_english: editedEnglish,
          tag: editedTag,
        };
      }
      return q;
    });

    setDatabase(editedDatabase);

    fetch(`/dictionary/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        word_in_finnish: editedFinnish,
        word_in_english: editedEnglish,
        tag: editedTag,
      }),
    });
  }

  const allQuestions = database.map((question, index) => {
    return (
      <EditComponent
        key={index}
        id={question.id}
        originalWord={question.word_in_finnish}
        correctTranslation={question.word_in_english}
        tag={question.tag}
        deleteQuestion={deleteQuestion}
        editQuestion={editQuestion}
      />
    );
  });

  function handleSubmit(e) {
    e.preventDefault();
    postToDatabase();
    setFinnishWord("");
    setEnglishWord("");
    setTag("");
    fetchAll();
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
    fetch("/dictionary/", {
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

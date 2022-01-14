import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import WordComponent from "./WordComponent";

/**
 *
 * @author Aki Helin
 * @version 1.0
 * Used to edit, delete or create new word pairs to the database on admin view.
 *
 * Admin gets a view of an input form and all of the rows in the database.
 * They can easily edit or delete any rows by using buttons that each of them has.
 *
 * @returns An input form and all the rows in the database, html elements.
 */
function AdminComponents() {
  /**
   * Stores the finnish word for the new word pair the admin is creating.
   */
  const [finnishWord, setFinnishWord] = useState("");
  /**
   * Stores the english word for the new word pair the admin is creating.
   */
  const [englishWord, setEnglishWord] = useState("");
  /**
   * Stores the tag for the new word pair the admin is creating.
   */
  const [tag, setTag] = useState("");
  /**
   * Stores every row fetched from the database (id, word in finnish and english and tag).
   */
  const [database, setDatabase] = useState([]);

  /**
   * Fetches everything from the database, backend catches the url.
   * Sets each row that was found in to the database variable.
   */
  async function fetchAll() {
    let data = await fetch("/dictionary");
    let js = await data.json();
    setDatabase(js);
  }

  /**
   * useEffect is called once when the page is opened so all the data gets fetched immediately.
   */
  useEffect(() => {
    fetchAll();
  }, []);

  /**
   * Used to delete a row from the database, sends a fetch delete for the specific id.
   * Called when the admin clicks a "Delete" button.
   * @param {Int} id comes from which component the admin clicks the delete button on.
   */
  async function deleteFromDatabase(id) {
    fetch(`/dictionary/${id}`, {
      method: "DELETE",
    });
  }

  /**
   * Deletes a word pair from the database variable and calls the function that deletes it from the actual database.
   * @param {int} id comes from which component the admin clicks the delete button on.
   */
  function deleteQuestion(id) {
    const filteredQuestions = [...database].filter(
      //returns every value that doesnt match the id got as a parameter, leaving the deleted one out.
      (question) => question.id !== id
    );
    deleteFromDatabase(id);
    setDatabase(filteredQuestions);
  }

  /**
   * Edits a value in the database variable and sets the new information for the admin to see.
   *
   * Goes through the current database and when a matching id is found, edits the values according to admins input.
   * After setting the local database, sends a fetch PUT request to edit the value in the actual database aswell.
   *
   * @param {Int} id Id of the word pair being edited
   * @param {String} editedFinnish Finnish word typed by Admin
   * @param {String} editedEnglish English word typed by admin
   * @param {String} editedTag Tag typed by admin
   */
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

    //fetch PUT gets caught by backend, edits the id given in the url.
    fetch(`/dictionary/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //body contains the edited information for the database.
      body: JSON.stringify({
        id: id,
        word_in_finnish: editedFinnish,
        word_in_english: editedEnglish,
        tag: editedTag,
      }),
    });
  }

  /**
   * Creates an WordComponent for each value in the database. These are displayed in the admins view.
   */
  const allQuestions = database.map((question, index) => {
    return (
      <WordComponent
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

  /**
   *
   * Once submit button is clicked, calls postToDatabase() to submit the new word pair to database.
   * After the submit is called, sets all the variables empty to clear the input fields.
   *
   * @param {Object} e event
   */
  function handleSubmit(e) {
    e.preventDefault(); //Prevents the submit button from refreshing the webpage.
    postToDatabase();
    setFinnishWord("");
    setEnglishWord("");
    setTag("");
  }

  /**
   *
   * Sets the input typed by admin to the corresponding setState variables.
   *
   * @param {Object} input
   * @param {String} target Which input field the function gets called from.
   */
  function handleChange(input, target) {
    if (target === "finnish") {
      setFinnishWord(input.target.value);
    } else if (target === "english") {
      setEnglishWord(input.target.value);
    } else if (target === "tag") {
      setTag(input.target.value);
    }
  }

  /**
   * Posts a new row to the database using Fetch POST
   * Calls fetchAll() to fetch the newly added information from the database.
   */
  function postToDatabase() {
    fetch("/dictionary/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //body gets information from the setState variables.
      body: JSON.stringify({
        word_in_finnish: finnishWord,
        word_in_english: englishWord,
        tag: tag,
      }),
    })
      .then(fetchAll())
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
            placeholder="Tag"
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

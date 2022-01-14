import React, { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditPopup from "./EditPopup";

/**
 * @author Aki Helin
 * @version 1.0
 *
 * WordComponent is called for each row in the database, returns the html elements shown on the admins page.
 *
 * @param {*} params gets multiple params from AdminComponent.js where this is called.
 * @returns HTML elements and EditPopup.js
 */
function EditComponent({
  id,
  originalWord,
  correctTranslation,
  tag,
  deleteQuestion,
  editQuestion,
}) {
  /**
   * Setter for opening the edit popup window
   */
  const [open, setOpen] = useState(false);
  /**
   * Finnish word edited by admin is stored here, default value is the original word
   */
  const [editedFinnish, setEditedFinnish] = useState(originalWord);
  /**
   * English word edited by admin is stored here, default value is the original word
   */
  const [editedEnglish, setEditedEnglish] = useState(correctTranslation);
  /**
   * Tag edited by admin is stored here, default value is the original tag
   */
  const [editedTag, setEditedTag] = useState(tag);

  /**
   * Handles the input typed to the edit fields, stores in corresponding variables.
   * Given as parameter to EditPopup
   *
   * @param {Object} input
   * @param {String} target Tells us where this function is called
   */
  function handleChange(input, target) {
    if (target === "fin") {
      setEditedFinnish(input.target.value);
    } else if (target === "eng") {
      setEditedEnglish(input.target.value);
    } else if (target === "tag") {
      setEditedTag(input.target.value);
    }
  }

  /**
   * Closes the popup window used to edit a word pair.
   * Calls parents function editQuestion if the admin accepts the edits they made, edited values are then passed to it.
   *
   * @param {boolean} edit true if admin pressed button "accept", false if "cancel"
   */
  function handleClose(edit) {
    if (edit) {
      editQuestion(id, editedFinnish, editedEnglish, editedTag);
    }
    setOpen(false);
  }

  /**
   * Opens the popup window used for editing the word pairs
   */
  function handleClickOpen() {
    setOpen(true);
  }

  return (
    <div className="flexContent">
      <p>Finnish = {originalWord}</p>
      <p>English = {correctTranslation}</p>
      <p>Tag = {tag}</p>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={() => deleteQuestion(id)}
      >
        Delete
      </Button>
      <EditPopup
        originalWord={originalWord}
        correctTranslation={correctTranslation}
        tag={tag}
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
      />
    </div>
  );
}

export default EditComponent;

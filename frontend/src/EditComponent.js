import React, { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditPopup from "./EditPopup";

function EditComponent({
  id,
  originalWord,
  correctTranslation,
  tag,
  deleteQuestion,
  editQuestion,
}) {
  const [open, setOpen] = useState(false);
  const [editedFinnish, setEditedFinnish] = useState(originalWord);
  const [editedEnglish, setEditedEnglish] = useState(correctTranslation);
  const [editedTag, setEditedTag] = useState(tag);

  function handleChange(input, target) {
    if (target === "fin") {
      setEditedFinnish(input.target.value);
    } else if (target === "eng") {
      setEditedEnglish(input.target.value);
    } else if (target === "tag") {
      setEditedTag(input.target.value);
    }
  }

  const handleClose = (edit) => {
    if (edit) {
      editQuestion(id, editedFinnish, editedEnglish, editedTag);
    }

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

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

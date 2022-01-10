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
  const handleClickOpen = () => {
    <EditPopup
      id={id}
      originalWord={originalWord}
      correctTranslation={correctTranslation}
      tag={tag}
      editQuestion={tag}
    />;
  };

  return (
    <div className="flexContent">
      <p>Id = {id}</p>
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
    </div>
  );
}

export default EditComponent;

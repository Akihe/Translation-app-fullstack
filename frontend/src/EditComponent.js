import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function EditComponent({
  database,
  id,
  originalWord,
  correctTranslation,
  tag,
  deleteQuestion,
}) {
  return (
    <div className="flexContent">
      <p>Id = {id}</p>
      <p>Finnish = {originalWord}</p>
      <p>English = {correctTranslation}</p>
      <p>Tag = {tag}</p>
      <Button variant="outlined">Edit</Button>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onclick={deleteQuestion}
      >
        Delete
      </Button>
    </div>
  );
}

export default EditComponent;
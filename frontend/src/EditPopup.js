import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function EditPopup({
  id,
  originalWord,
  correctTranslation,
  tag,
  editQuestion,
}) {
  const [open, setOpen] = useState(true);
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
      editQuestion(id, originalWord, correctTranslation);
    }

    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please type in the content to be edited
          </DialogContentText>
          <TextField
            autoFocus
            value={editedFinnish}
            onChange={(input) => handleChange(input, "fin")}
            margin="dense"
            id="word in Finnish"
            label="Word in Finnish"
            fullWidth
            variant="standard"
          />
          <TextField
            value={correctTranslation}
            margin="dense"
            id="word in English"
            label="Word in English"
            fullWidth
            variant="standard"
          />
          <TextField
            value={tag}
            margin="dense"
            id="tag"
            label="Tag"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditPopup;

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function EditPopup({
  originalWord,
  correctTranslation,
  tag,
  open,
  handleClose,
  handleChange,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please type in the content to be edited
        </DialogContentText>
        <TextField
          autoFocus
          defaultValue={originalWord}
          onChange={(input) => handleChange(input, "fin")}
          margin="dense"
          id="word in Finnish"
          label="Word in Finnish"
          fullWidth
          variant="standard"
        />
        <TextField
          defaultValue={correctTranslation}
          onChange={(input) => handleChange(input, "eng")}
          margin="dense"
          id="word in English"
          label="Word in English"
          fullWidth
          variant="standard"
        />
        <TextField
          defaultValue={tag}
          onChange={(input) => handleChange(input, "tag")}
          margin="dense"
          id="tag"
          label="Tag"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={() => handleClose(true)}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPopup;

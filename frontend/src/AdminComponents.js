import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

function AdminComponents() {
  const [finnishWord, setFinnishWord] = useState();
  const [englishWord, setEnglishWord] = useState();
  const [tag, setTag] = useState();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(input, target) {
    if (target.equals("finnish")) {
      setFinnishWord(input.target.value);
    } else if (target.equals("english")) {
      setEnglishWord(input.target.value);
    } else if (target.equals("tag")) {
      setTag(input.target.value);
    }
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
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminComponents;

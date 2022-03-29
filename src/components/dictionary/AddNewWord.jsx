import React, { useState } from "react";
import { Grid, InputBase, Button } from "@mui/material";

const AddNewWord = ({ addNewWord, currentUser, setCodeForm, subject }) => {
  const [sendForm, setSendForm] = useState({
    word: "",
    meaning: "",
    type: "",
    pronunciations: [],
    description: "",
    synonymous: [],
    antonyms: [],
    examples: [],
  });

  const handleChange = (e) => {
    Object.keys(sendForm).forEach((key) => {
      if (key === e.target.name) {
        sendForm[key] = e.target.value;
        setSendForm({ ...sendForm });
      }
    });
  };

  const confirmResult = () => {
    addNewWord(sendForm, currentUser, subject);
    if (setCodeForm) {
      setCodeForm(0);
    }
  };

  return (
    <Grid item xs={12} sm={12}>
      <form className="form">
        <div className="form_control">
          <label>Enter word</label>
          <InputBase
            fullWidth={true}
            type="text"
            name="word"
            placeholder="Enter word"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form_control">
          <label>Enter meaning word</label>
          <InputBase
            type="text"
            placeholder="Meaning of word"
            name="meaning"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form_control">
          <label>Type of word</label>
          <InputBase
            type="text"
            placeholder="Enter type of word"
            name="type"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form_control">
          <label>Description</label>
          <InputBase
            type="text"
            placeholder="Enter description"
            name="description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form_control">
          <Button
            variant="outlined"
            size="small"
            color="success"
            type="button"
            onClick={() => confirmResult()}
          >
            Submit
          </Button>
          <br />
          <Button
            type="button"
            variant="outlined"
            size="small"
            color="error"
            onClick={() => {
              if (setCodeForm) {
                setCodeForm(0)
              }
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Grid>
  );
};

export default AddNewWord;

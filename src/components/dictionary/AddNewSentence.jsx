import React, {useState} from 'react'
import { Grid, InputBase, Button } from "@mui/material";

const AddNewSentence = ({ addNewSentence, currentUser, setCodeForm, subject }) => {

  const [sendForm, setSendForm] = useState({
    question: '',
    answers: [],
    checked: false,
    createdAt: Date.now()
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
    addNewSentence(sendForm, subject,  currentUser);
    if (setCodeForm) {
      setCodeForm(0);
    }
  };

  return (
    <Grid item xs={12} sm={12}>
      <form className="form">
        <div className="form_control">
          <label><strong>Enter new question</strong></label>
          <InputBase
            fullWidth={true}
            type="text"
            name="question"
            placeholder="Enter question content"
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
  )
}

export default AddNewSentence
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Grid, InputBase } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faQuestion } from "@fortawesome/free-solid-svg-icons";

const AlertQuestion = ({link, question, addReplyQuestion, subject }) => {

  const [answer, setAnswer] = useState('');

  const submitAnswer = () => {
    if (addReplyQuestion){
      addReplyQuestion(question?.id, subject, answer)
    }
  }

  return (
    <Grid item xs={12} sm={4}>
      <Link to={link ? link : "#"} replace>
        <div className="widget2">
          <div className="widget2_icon">
            <Avatar sx={{ bgcolor: red[500] }}>
            <FontAwesomeIcon icon={faQuestion} />
              </Avatar>
          </div>
          <div className="widget2_content">
            <span>{question?.question}</span>
            <InputBase
              type="text"
              fullWidth={true}
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              autoComplete="off"
              placeholder="Enter your answer..."
            />
          </div>
          <div className="widget2_progress">
            <Avatar onClick={() => submitAnswer()}>
              <FontAwesomeIcon icon={faReply} />
            </Avatar>
          </div>
        </div>
      </Link>
    </Grid>
  );
};

export default AlertQuestion;

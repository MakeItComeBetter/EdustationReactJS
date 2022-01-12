import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, TextField } from '@mui/material';
import Widget2 from './Widget2';
import { useParams } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import withAuthenticated from './HOCs/withAuthenticated';


const Example = ({ currentUser, questions, targetTime, windowToken }) => {
  const { id } = useParams();
  const [questionsExam, setQuestionsExam] = useState(questions);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(100);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    setQuestionsExam(questions);
    setProgress(100);
  }, [currentUser, questions, targetTime, windowToken])

  useEffect(() => {

    if (progress < 0) {
      if (submited) outTimeCheckScore();
      return
    };
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          return 0;
        }

        return oldProgress - 100 / targetTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [progress, targetTime, submited]);

  const handleChange = (event) => {
    let newArr = [...answers];
    newArr = newArr.filter(e => e.question !== event.target.name);
    newArr.push({ question: event.target.name, answer: event.target.value });
    setAnswers(newArr);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
  };


  const printAnswer = (str) => {
    let arr = str.split(' ');
    let result = [];
    let count = 1;
    for (let i = 1; i < arr.length - 1; i++) {
      if (arr[i] === '...') {
        result.push(count);
        count++;
      }
    }
    return result;
  }


  const showQuestion = (question, index) => {
    switch (question.type_question) {
      case "choice":
        return (
          <FormControl component="fieldset" style={{ width: '100%' }}>
            <FormLabel component="legend">{`${index + 1}.${question.name}`}</FormLabel>
            <RadioGroup aria-label={`${question.id}`} name={`${question.id}`} onChange={handleChange}>
              {
                question?.answers?.map((answer, i) => (
                  <div key={i}>
                    <FormControlLabel value={`${answer.id}`} control={<Radio size="small" />} label={answer.content} />
                  </div>
                ))
              }
            </RadioGroup>
          </FormControl >
        )
      case "listening":
        return (
          <FormControl component="fieldset" style={{ width: '100%' }}>
            <FormLabel component="legend">{`${index + 1}.${question.name}`}</FormLabel>
            {
              printAnswer(question.name).map((item, index) => (
                <TextField
                  key={index}
                  autoComplete="off"
                  name={question.id + '.' + item + ''}
                  size="small"
                  onChange={handleChange}
                  fullWidth={true}
                  margin="dense"
                  placeholder={`Answer ${index + 1}`}
                  variant="outlined"
                />
              ))
            }
          </FormControl>
        )
      default:
        return "";
    }
  }

  const sortQuestions = (questions) => {
    const listenings = Array.from(questions).filter(e => e.type_question === "listening");
    const choices = Array.from(questions).filter(e => e.type_question === "choice");
    return choices.concat(listenings).sort();
  }


  const checkMissingInput = () => {
    const inputs = document.querySelectorAll('input');
    const choices = Array.from(inputs).filter(e => e.type === "radio");
    const listenings = Array.from(inputs).filter(e => e.type === "text");
    if (choices.filter(e => e.checked).length * 4 !== choices.length) {
      alert("Maybe you missing some choice options! Please check this issue.");
      return true;
    }

    for (const i of listenings.filter(e => e.value === "")) {
      let answer = document.getElementsByName(i.name)[0];
      if (answer) { answer.focus(); return true };

    }
    return false;
  }


  const outTimeCheckScore = () => {
    const inputs = document.querySelectorAll('input');
    const answersInput = [];

    for (const i of inputs) {

      if (i.type === "radio" && i.checked) {
        answersInput.push({ type: "choice", question: i.name, answer: i.value })
      } else if (i.type === "text" && i.value !== "") {
        answersInput.push({ type: "listening", question: i.name, answer: i.value.trim() })
      }
      i.disabled = true;
    }
    
    console.log(answersInput)
  }

  const checkScore = (e) => {
    if (progress < 0) {
      alert("Your time out.");
      return;
    }
    e.preventDefault();
    const check = checkMissingInput();
    if (check === false) {
      setSubmited(true);
      outTimeCheckScore();
    };
  }



  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget2 title={`Example ${id}`} content="Don't submit or out this page when don't done this yet." />
        <LinearProgress variant="determinate" value={progress} sx={{
          color: progress === 20 ? 'red' : 'green'
        }} />
      </Grid>
      <Grid item xs={12} sm={12} padding={1}>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {
            questionsExam && questionsExam.length > 0 ?
              <React.Fragment>

                {
                  sortQuestions(questionsExam)?.map((question, index) => (
                    <React.Fragment key={index}>
                      {
                        showQuestion(question, index)
                      }
                    </React.Fragment>
                  ))
                }
                <hr />
                <Button type="submit" variant="outlined" color="primary" onClick={checkScore}>
                  Check Answer
                </Button>
              </React.Fragment> :
              <div>
                <span>Please select an example.</span>
              </div>
          }
        </form>
      </Grid>
    </Grid>
  )
}

export default withAuthenticated(Example)

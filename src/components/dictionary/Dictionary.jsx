import React, { useEffect, useState } from "react";
import { Grid, Avatar } from "@mui/material";
import HeaderSection from "../HeaderSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "../index";
import { green } from "@mui/material/colors";
import AddNewWord from "./AddNewWord";
import AddNewSentence from "./AddNewSentence";
import { useHistory } from "react-router-dom";
import { HOME_PATH } from "../../constance/urlPath";

const Dictionary = ({ currentUser, addNewWord, addNewSentence, currentSubject }) => {
  const [formCode, setFormCode] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (!currentSubject){
      history.push(HOME_PATH);
    }
  }, [currentSubject, history])

  const switchForm = (codeForm) => {
    switch (codeForm) {
      case 1:
        return (
          <AddNewWord currentUser={currentUser} addNewWord={addNewWord} subject={currentSubject} setCodeForm={setFormCode} />
        )
        case 2:
          return (
            ''
          )
          case 3:
            return (
              <AddNewSentence currentUser={currentUser} addNewSentence={addNewSentence} subject={currentSubject} setCodeForm={setFormCode} />
            )
      default:
        return "";
    }
  };

  return (
    <Grid container>
      <HeaderSection
        go={"/"}
        title="Dictionary"
        link={`subject/${currentSubject}`}
        iconAction={<FontAwesomeIcon icon={faUserPlus} />}
      />
      <SectionTitle title="Contribute for dictionary" />
      <Grid item xs={12} sm={4} onClick={() => setFormCode(1)}>
        <div className="widget2">
          <div className="widget2_icon">
            <Avatar sx={{ bgcolor: green[500] }}>
              <FontAwesomeIcon icon={faPlus} />
            </Avatar>
          </div>
          <div className="widget2_content">
            <span>Add new word</span>
            <small>Add new word to dictionary</small>
          </div>
          <div className="widget2_progress"></div>
        </div>
      </Grid>
      <Grid item xs={12} sm={4} onClick={() => setFormCode(2)}>
        <div className="widget2">
          <div className="widget2_icon">
            <Avatar sx={{ bgcolor: green[500] }}>
              <FontAwesomeIcon icon={faPlus} />
            </Avatar>
          </div>
          <div className="widget2_content">
            <span>Add new formula</span>
            <small>Add new formula to dictionary</small>
          </div>
          <div className="widget2_progress"></div>
        </div>
      </Grid>
      <Grid item xs={12} sm={4} onClick={() => setFormCode(3)}>
        <div className="widget2">
          <div className="widget2_icon">
            <Avatar sx={{ bgcolor: green[500] }}>
              <FontAwesomeIcon icon={faPlus} />
            </Avatar>
          </div>
          <div className="widget2_content">
            <span>Make new sentence</span>
            <small>Make sentences to dictionary</small>
          </div>
          <div className="widget2_progress"></div>
        </div>
      </Grid>
      <hr />
      {switchForm(formCode)}
    </Grid>
  );
};

export default Dictionary;

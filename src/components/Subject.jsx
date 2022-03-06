import React, { useEffect} from 'react';
import { useParams } from 'react-router';
import { Grid } from '@mui/material';
import { SectionTitle, Widget1, Widget2 } from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFileAlt, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { DICTIONARY_PATH, HOME_PATH } from '../constance/urlPath';
import { useDispatch } from 'react-redux';
import {SET_CURRENT_SUBJECT} from '../constance/ActionTypes';
import { useHistory } from "react-router-dom";

const Subject = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (name){
      dispatch({type: SET_CURRENT_SUBJECT, payload: {currentSubject: name}})
    }else {
      history.push(HOME_PATH)
    }
  }, [name, dispatch, history])

  return (
    <Grid container className="subject">
      <SectionTitle link={`/home`} title="Home" icon={<FontAwesomeIcon icon={faChevronLeft} />} />
      <SectionTitle title="Tracking" />
      <Grid item xs={12} className="subject__process">
        <Widget1 title="English" num={11} progress={20} lesson="Bài 2" content="Come in again please." />
        <Widget1 title="Japanese" num={11} progress={10} lesson="Bài 2" content="Bạn mới hoàn thành 1 nửa" />
        <Widget1 title="Japanese" num={11} progress={10} lesson="Bài 2" content="Bạn mới hoàn thành 1 nửa" />
        <Widget1 title="Japanese" num={11} progress={10} lesson="Bài 2" content="Bạn mới hoàn thành 1 nửa" />
      </Grid>
      {/* <SectionTitle title="Vocabulary" />
      <Grid item xs={12}>
        <Widget2 link={`/dictionary`} icon={<FontAwesomeIcon icon={faPlus} />} title="Add new vocab" content="Kiểm tra các kĩ năng tổng hợp." />
      </Grid> */}
      <SectionTitle title="Exercise" />
      <Grid item xs={12} className="subject__practices">
        <Widget2 icon={<FontAwesomeIcon icon={faBook} />} title="Pronunciation" content="Kiểm tra cách phát âm của bạn." />
        <Widget2 icon={<FontAwesomeIcon icon={faBook} />} title="Speaking skills" content="Nâng cao khả năng communicate như người bản xứ." />
        <Widget2 icon={<FontAwesomeIcon icon={faBook} />} title="Listening" content="Nâng cao khả năng nghe hiểu nhanh chóng." />
      </Grid>
      <SectionTitle title="Audit" />
      <Grid item xs={12}>
        <Widget2 link={`/examples/${name}`} icon={<FontAwesomeIcon icon={faFileAlt} />} title="Bài kiểm tra tổng hợp" content="Kiểm tra các kĩ năng tổng hợp." />
      </Grid>
      <SectionTitle title="Dictionary" />
      <Grid item xs={12}>
        <Widget2 icon={<FontAwesomeIcon icon={faBook} />} title="Dictionary" link={DICTIONARY_PATH} content="Tra cứu bất cừ cụm từ nào và kiểm tra phát âm của bạn và phát triển dictionary" />
      </Grid>
    </Grid>
  )
}

export default Subject

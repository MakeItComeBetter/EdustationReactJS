import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { SectionTitle } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';


const Examples = ({ fetchExam }) => {
  const { name } = useParams();
  const [chipExams, setChipExams] = useState([]);
  const [newExams, setNewExams] = useState([]);

  const addExam = () => {
    setNewExams([...newExams, `Bài ${newExams.length + 1}`]);
  }
  const mergeExam = () => {
    setChipExams([...chipExams.concat(newExams)]);
    setNewExams([]);
  }
  const clearAll = () => {
    setChipExams([]);
    setNewExams([]);
  }

  return (
    <Grid container >
      <SectionTitle link={`/subject/${name}`} title="Back" icon={<FontAwesomeIcon icon={faChevronLeft} />} />
      <SectionTitle title="Bài kiểm tra có sẵn" />
      <br />
      <Grid item xs={12} >
        <Stack direction="row" className="example_stack" style={{ display: 'flex', flexWrap: `wrap` }}>
          {
            chipExams.length > 0 ? chipExams.map((v, i) => (
              <Link to={`/example/${i + 1}`} onClick={() => fetchExam(i + 1)} replace key={i}>
                <Chip key={i} label={v} />
              </Link>
            )) :
              <small>You don't having any examples.</small>
          }
        </Stack>
      </Grid>
      <SectionTitle title="Tạo bài tự động" />
      <button type="button" onClick={() => addExam()}>Generate</button>
      <button type="button" onClick={() => mergeExam()}>Merge</button>
      <button type="button" onClick={() => clearAll()}>Clear All</button>
      <Grid item xs={12} >
        <Stack direction="row" className="example_stack" style={{ display: 'flex', flexWrap: `wrap` }}>
          {
            newExams.map((v, i) => (
              <Link to={`/example/${i + 1}`} onClick={() => fetchExam(i + 1)} replace key={i}>
                <Chip label={v} variant="outlined" />
              </Link>
            ))
          }
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Examples

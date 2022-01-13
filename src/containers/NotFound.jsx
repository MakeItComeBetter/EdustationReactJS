import React from 'react';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div style={{
      width: '100%',
      height: 600,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#c10c0c'
    }}>
      <span>Ops ! Some things went wrong? :(</span>
      <Link to="/" replace>
      <Button> <ArrowBackIcon />Back to home</Button>
      </Link>
    </div>
  )
}

export default NotFound

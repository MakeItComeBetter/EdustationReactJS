import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const Loading = () => {

  return (
    <React.Fragment>
      <Grid container spacing={1} style={{marginTop: 1}}>
        <Grid item xs={12} sm={3} >
          <Skeleton variant="rect" width="100%">
            <div style={{ paddingTop: '20%' }} />
          </Skeleton>
          <Skeleton variant="rect" width="100%">
            <div style={{ paddingTop: '20%' }} />
          </Skeleton>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Skeleton variant="rect" width="100%">
            <div style={{ paddingTop: '30%' }} />
          </Skeleton>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Loading

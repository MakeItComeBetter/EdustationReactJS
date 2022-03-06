import React from 'react';
import { Grid, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const SectionTitle = (props) => {
  let { icon, title, link } = props;
  

  return (
    <Grid container className="section_title">
      <Link to={link ? link : "#"} replace className="section_title_link">

        <Grid item xs={12} sm={12} style={{ display: 'flex', alignItems: 'center', padding: '', fontWeight: 'bold', height: 45 }}>
          {
            icon ?
              <IconButton size="medium">
                {icon}
              </IconButton> : ""
          }
          <span style={{ marginLeft: 5 }}>{title}</span>
        </Grid>
      </Link>
    </Grid>
  )
}

export default SectionTitle

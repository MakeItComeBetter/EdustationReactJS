import React from 'react';
import { Avatar, Grid, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const HeaderSection = ({ title = 'Section title', link = '/', iconAction, go }) => {

  return (
    <Grid item xs={12} className='header_section'>
      <div className='header_section_first'>
        <Link to={link} replace>
          <IconButton>
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>
        </Link>
        <strong>Back</strong>
      </div>
      <div className='header_section_second'>
        <h3>{title}</h3>
      </div>
      <div className='header_section_three'>
        <Link to={go ? go : '/'} replace >
          <Avatar sx={{ width: 30, height: 30, color: 'black', background: 'transparent' }}>
            {iconAction}
          </Avatar>
        </Link>
      </div>
    </Grid>
  )
}

export default HeaderSection

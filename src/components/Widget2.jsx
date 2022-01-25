import React from 'react'
import CircularProgressWithLabel from './CircularProgressWithLabel'
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';



const Widget2 = (props) => {
  let { icon, title, content, progress, link } = props;

  return (
    <Grid item xs={12} sm={4}>
      <Link to={link ? link : "#"} replace>
        <div className="widget2">
          <div className="widget2_icon">
            <Avatar sx={{ bgcolor: green[500] }}>
              {icon}
            </Avatar>
          </div>
          <div className="widget2_content">
            <span>{title}</span>
            <small>{content}</small>
          </div>
          <div className="widget2_progress">
            {
              progress ?
                <Avatar sx={{ backgroundColor: 'transparent' }}>
                  <CircularProgressWithLabel value={progress ? progress : 100} color="error" />
                </Avatar> : ""
            }
          </div>
        </div>
      </Link>
    </Grid>
  )
}

export default Widget2

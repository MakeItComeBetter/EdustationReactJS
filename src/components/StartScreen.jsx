import React from 'react';
import { Button, Grid } from '@mui/material';
import { HOME_PATH } from '../constance/urlPath';
import { Link } from 'react-router-dom';
import withAuthenticated from '../components/HOCs/withAuthenticated';
import { LazyLoadImage } from 'react-lazy-load-image-component';



const StartScreen = () => {

  return (
    <Grid container spacing={1} className="home">
      <Grid item sm={12} xs={12}>
        <div className="home_theme">
          <LazyLoadImage
            alt={'start_image'}
            effect='blur'
            className='home_image_start'
            src={'/start_img.png'} // use normal <img> attributes as props
          />
          <div className="home_theme_content">
            <p><span>Bạn đã sẵn sàng chưa?</span></p>
            <p>
              <small>Chúng ta sẽ bắt đầu ngay thôi.</small>
            </p>
            <div>
              <Link to={HOME_PATH} replace>
              <Button variant="outlined" color="error" sx={{borderRadius: 15}}>
                Get started
              </Button>
              </Link>
            </div>
          </div>

        </div>
      </Grid>
    </Grid>
  )
}

export default withAuthenticated(StartScreen)

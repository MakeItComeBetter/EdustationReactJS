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
            src={'https://firebasestorage.googleapis.com/v0/b/edustation-2f482.appspot.com/o/images%2Fkisspng-penguin-madagascar-rico-clip-art-happy-feet-5ac4f76dbc5c13.7798480015228578377715.png?alt=media&token=757cc9c6-12f1-4c1a-96b2-1fea754525bb'} // use normal <img> attributes as props
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

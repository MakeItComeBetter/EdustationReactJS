import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Hidden } from '@mui/material';
import { COMMUNITY_PATH, FRIENDS_PATH, HOME_PATH, LOGIN_PATH, MESSENGER_PATH, USER_PATH } from '../constance/urlPath';
import Avatar from '@mui/material/Avatar';


const Nav = ({ currentUser }) => {
  const { displayName } = currentUser || {};

  const [sizeSearch, setSizeSearch] = useState(6);
  const [valueSearch, setValueSearch] = useState('');

  const focusSearch = () => {
    let logo = document.getElementById('nav__logo')
    if (logo.style.display === 'none') {
      logo.style.display = "";
      setSizeSearch(6);
    } else {
      logo.style.display = "none";
      setSizeSearch(10);
    }
  }

  const getValueSearch = (e) => {
    console.log(valueSearch)
    setValueSearch(e.target.value);
  }

  return (
    <Grid container className="nav">
      <Grid item sm={4} xs={4} id="nav__logo" className="nav__logo">
        <Link replace to={HOME_PATH}>
          <span>EduStation</span>
        </Link>
      </Grid>
      <Hidden only={['xs', 'md']} >
        <Grid item sm={5}>
          <div className="nav__links">
            <div className="nav__link">
              <Link replace to="/home">
                Home
              </Link>
            </div>
            <div className="nav__link">
              <Link replace to={FRIENDS_PATH}>
                Friends
              </Link>
            </div>
            <div className="nav__link">
              <Link replace to={MESSENGER_PATH}>
                Messenger
              </Link>
            </div>
            <div className="nav__link">
              <Link  to={COMMUNITY_PATH} replace>
                Community
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item sm={3}>
          <div className="nav__user_actions">
            {/* <Button variant="outlined" color="error" size="small" sx={{
              borderRadius: 10,
            }} className="nav__link nav__start_btn">
              <Link replace to={LOGIN_PATH}>
                Get Started
              </Link>
            </Button> */}
            <div className="nav__link">
              {currentUser ?
                <Link to={USER_PATH} replace>
                  <Avatar alt={displayName} sx={{
                    width: 33,
                    height: 33
                  }} src={currentUser?.photoURL ? currentUser?.photoURL : ""} />
                </Link>
                :
                <Link replace to={LOGIN_PATH}>
                  {/* <AccountCircleIcon /> */}
                  <span>Login</span>/
                  <span>Sign up</span>
                </Link>
              }
            </div>
          </div>
        </Grid>
      </Hidden>
      <Hidden only={['lg', 'md', 'sm', 'xl']}>
        <Grid item xs={sizeSearch} className="nav__search">
          <input type="text" onFocus={focusSearch} onChange={getValueSearch} placeholder="Search anything else" onBlur={focusSearch} />
        </Grid>
        <Grid item xs={2} className="nav__cart">
          <Link to={USER_PATH} replace>
            <Avatar alt={displayName} sx={{
              width: 33,
              height: 33
            }} src={currentUser?.photoURL ? currentUser?.photoURL : ""} />
          </Link>
        </Grid>
      </Hidden>
    </Grid>
  )
}



export default React.memo(Nav);

import { Avatar, Grid, InputBase } from '@mui/material';
import React, { useEffect } from 'react';
import HeaderSection from './HeaderSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faCommentDots, faUserSlash, faSearch } from "@fortawesome/free-solid-svg-icons";
import InputAdornment from '@mui/material/InputAdornment';
import { useHistory } from 'react-router-dom';
import { COMMUNITY_PATH } from '../constance/urlPath';

const Friends = ({ currentUser,
  friends,
  getUserFriends,
  createRoomByMembers,
  unFriend,
}) => {
  const navigator = useHistory();

  useEffect(() => {
    getUserFriends(currentUser);
  }, [currentUser, getUserFriends])

  return (
    <Grid container>
      <HeaderSection
        go={COMMUNITY_PATH}
        title='Friends'
        link={'/messenger'}
        iconAction={<FontAwesomeIcon icon={faUserPlus}
        />}
      />

      <Grid item xs={12} className='friends'>
        <InputBase type="text"

          fullWidth={true}
          autoComplete='off'
          className='friends__search'
          placeholder='Enter name friend'
          startAdornment={
            <InputAdornment position="start">
              <Avatar sx={{ width: 30, height: 30, color: 'black', background: 'transparent' }}>
                <FontAwesomeIcon icon={faSearch} />
              </Avatar>
            </InputAdornment>
          }
        />
        {
          friends?.map((v, i) => (
            <div key={i} className='friend__widget'>
              <Avatar src={v?.photoURL} alt={v?.displayName} />
              <strong>{v?.displayName}</strong>
              <div className='friend__widget_actions'>
                <Avatar sx={{ width: 38, heigh: 38, marginRight: 1 }} onClick={() => createRoomByMembers(navigator, currentUser?.uid, [v, {displayName: currentUser?.displayName, photoURL: currentUser?.photoURL, uid: currentUser?.uid }], [v?.uid, currentUser?.uid])} >
                  <FontAwesomeIcon icon={faCommentDots} />
                </Avatar>
                <Avatar sx={{ width: 38, heigh: 38 }} onClick={() => unFriend(currentUser, v?.uid)}>
                  <FontAwesomeIcon icon={faUserSlash} />
                </Avatar>
              </div>
            </div>
          ))
        }
      </Grid>
    </Grid>
  )
}

export default Friends

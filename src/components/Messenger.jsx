import React, { useEffect, useState } from 'react';
import withAuthenticated from './HOCs/withAuthenticated';
import { Avatar, Badge, Grid, IconButton, InputBase } from '@mui/material';
import { Link } from 'react-router-dom';
import { PeopleAlt, Public } from '@mui/icons-material';
import { COMMUNITY_PATH, FRIENDS_PATH, HOME_PATH } from '../constance/urlPath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputAdornment from '@mui/material/InputAdornment';
import { useHistory } from 'react-router-dom';
import HeaderSection from './HeaderSection';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Delete from '@mui/icons-material/Delete';
import StyledBadge from '../components/StyledBadge';

const Messenger = ({
  currentUser,
  getUserFriends,
  friends,
  rooms,
  fetchMoreRooms,
  createRoomByMembers,
  initRooms,
  deleteRoom,
  roomsWithHasUnCheckMsg
}) => {
  let navigate = useHistory();
  useEffect(() => {
    getUserFriends(currentUser);
  }, [currentUser, getUserFriends])

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initRooms(currentUser)
  }, [initRooms, currentUser])

  const fetchMore = async () => {
    setLoading(true);
    const result = await fetchMoreRooms(currentUser);
    setLoading(!result)
  }

  // const filterRooms = () => {

  // }


  return (
    <Grid container className="messenger">
      <HeaderSection title='Chats' link={HOME_PATH} iconAction={<FontAwesomeIcon icon={faSearch} />} />
      <Grid item xs={12}className='friends'>
        <InputBase type="text"
          value=''
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
      </Grid>
      <Grid item xs={12}className="messenger__friends">
        {
          friends.map((v, i) => (
            <React.Fragment key={i} >
              {
                v?.isOnline ?
                  <div className="messenger__friend" onClick={() => createRoomByMembers(navigate, currentUser?.uid, [v, { displayName: currentUser?.displayName, photoURL: currentUser?.photoURL, uid: currentUser?.uid }], [v?.uid, currentUser?.uid])}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Avatar sx={{ width: 45, height: 45 }} src={v?.photoURL} alt={v?.displayName} />

                    </StyledBadge>
                    <small>{v?.displayName}</small>
                  </div> : ""
              }
            </React.Fragment>
          ))
        }
      </Grid>
      <Grid item xs={12} className="messenger__container">
        <InfiniteScroll
          dataLength={rooms?.length ? rooms?.length : 0}
          next={fetchMore}
          style={{
            display: 'flex',
            flexDirection: 'column-reverse'
          }} //To put endMessage and loader to the top.
          inverse={true} //
          hasMore={true}
          loader={loading ? <span className='msgs__loading'><CircularProgress color="inherit" sx={{ width: 20, height: 20 }} /></span> : ""}
          scrollableTarget="scrollableDiv"
        >
          {
            rooms && rooms.length > 0 ? rooms.map((v, i) => (

              <div className="messenger__widget" key={i}>
                <Link to={`messages/${v?.roomId}`}>
                  <div className='messenger__widget_main'>
                    <Badge badgeContent={roomsWithHasUnCheckMsg.find((e) => e.room === v?.roomId)?.hasUncheckedMsgs}
                      color="error">
                      <Avatar sx={{ width: 40, height: 40 }} src={
                        v?.membersDetails.find((e) => e?.uid !== currentUser?.uid)?.photoURL
                      } />
                    </Badge>
                  </div>
                </Link>
                <Link to={`messages/${v?.roomId}`}>
                  <div className="messenger__content">
                    <strong>{v?.membersDetails.find((e) => e?.uid !== currentUser?.uid)?.displayName}</strong>
                    <small>{v?.messages && v?.messages.length > 0 && v?.messages[v?.messages?.length - 1] ? v.messages[v?.messages?.length - 1].message : ""}</small>
                  </div>
                </Link>
                <Tooltip title="Delete this room" className='messenger__widget_actions'>
                  <IconButton onClick={() => deleteRoom(v?.roomId)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>

            ))
              :
              <span style={{ textAlign: 'center' }}>No messages available</span>
          }
        </InfiniteScroll>
        <Grid item xs={12}className="messenger__bottom">
          <Link to={FRIENDS_PATH} replace>
            <PeopleAlt />
          </Link>
          <Link to={COMMUNITY_PATH} replace>
            <Public />
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withAuthenticated(Messenger)

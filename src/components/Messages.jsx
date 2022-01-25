import React, { useEffect, useState } from 'react';
import withAuthenticated from './HOCs/withAuthenticated';
import { Avatar, IconButton, InputBase, Grid } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SendIcon from '@mui/icons-material/Send';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPhoneAlt, faVideo } from "@fortawesome/free-solid-svg-icons";
import { MESSENGER_PATH } from '../constance/urlPath';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const Messages = ({
  currentUser,
  createNewMessage,
  currentMessages,
  lastVisibleMsg,
  fetchMoreMessages,
  initMessages,
  friends,
  checkedAllMsgs,
  clearCurrentRoomData,
  currentUserChatting
}) => {
  const { id } = useParams();
  const [onSend, setOnSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    initMessages(id, currentUser);
  }, [id, initMessages, currentUser])

  useEffect(() => {
    checkedAllMsgs(currentUser, id, currentMessages);
  }, [checkedAllMsgs, currentMessages, id, currentUser])


  const fetchMore = async () => {
    setLoading(true);
    const result = await fetchMoreMessages(id, lastVisibleMsg, currentMessages);
    setLoading(!result)
  }

  const handleSendMsg = () => {
    createNewMessage(id, inputVal, currentUser?.uid);
    setInputVal('');
  }

  const handleChange = (e) => {
    setInputVal(e.target.value);
  }

  


  return (
    <Grid container>
      <Grid item xs={12} className='msgs__header'>
        <Grid item xs={8} className='msgs__header_first'>
          <Link to={MESSENGER_PATH} replace className='msgs__icon' onClick={() => clearCurrentRoomData()}>
            <IconButton>
              <FontAwesomeIcon icon={faChevronLeft} />
            </IconButton>
          </Link>
          <Avatar src={currentUserChatting?.photoURL} alt='' sx={{ width: 38, height: 38, margin: 1 }} />
          <div className='msgs__header_in4'>
            <strong>{currentUserChatting?.displayName}</strong>
            <small>Active now</small>
          </div>
        </Grid>
        <Grid item xs={4} className='msgs__header_actions'>
          <Avatar sx={{ width: 38, height: 38, margin: 1 }}>
            <FontAwesomeIcon icon={faPhoneAlt} className='msgs__icon' />
          </Avatar>
          <Avatar sx={{ width: 38, height: 38 }}>
            <FontAwesomeIcon icon={faVideo} />
          </Avatar>
        </Grid>
      </Grid>
      <Grid item xs={12} className='msgs__container' id="scrollableDiv"
        style={{
          height: currentMessages?.length > 0 ? window.innerHeight - 110 : 'auto'
        }}>

        {/*Put the scroll bar always on the bottom*/}
        <InfiniteScroll
          dataLength={currentMessages?.length}
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
            currentMessages && currentMessages.length > 0 ?
              currentMessages?.map((v, i) => (
                <div key={i} className="msgs__block">
                  {
                    v?.author === currentUser.uid ?
                      <div className="msgs__curUsrMsg">
                        <span className="msgs__curUsrMsg_content">
                          {v?.message}
                        </span>
                      </div> :
                      <div className="msgs__anoUsrMsg">
                        <span className="msgs__anoUsrMsg_content">
                          {v?.message}
                        </span>
                      </div>

                  }

                </div>
              )) :
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Avatar src={currentUserChatting?.photoURL} sx={{
                  width: 120,
                  height: 120
                }} />
                <strong><h3>{currentUserChatting?.displayName}</h3></strong>
                {
                  friends?.filter((e) => e?.uid === currentUserChatting?.uid).length > 0 ?
                    <span>This user is your friend.</span> :
                    <div>
                      <button>Add Friend</button>
                    </div>
                }
              </div>
          }
        </InfiniteScroll>
      </Grid>
      <Grid item xs={12} className='msgs__bottom'
        style={{
          position: currentMessages?.length > 0 ? '' : 'fixed',
          bottom: currentMessages?.length > 0 ? '' : '0',
          right: 0,
          left: 0
        }}
      >
        <InputBase type="text"
          fullWidth={
            true
          }
          onChange={(e) => handleChange(e)}
          value={inputVal}
          autoComplete='off'
          id="input_message" onFocus={() => {
            setOnSend(true);
          }
          }
          onBlur={(e) => {
            if (e.target.value) return
            if (!e.target.value) setOnSend(false)
          }}
          sx={{
            borderRadius: 18,
          }}
          endAdornment={
            <InputAdornment position="end" sx={{ color: 'black' }}>
              <Avatar sx={{ width: 33, height: 33, color: 'black', background: 'transparent' }}>
                <SentimentSatisfiedIcon />
              </Avatar>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <KeyboardHideIcon />
            </InputAdornment>
          }
          className='msgs__bottom__input'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              return handleSendMsg();
            }
          }}
        />
        {
          onSend ?
            <IconButton onClick={() => handleSendMsg()}>
              <SendIcon className='msgs__icon'
              />
            </IconButton>
            :
            <React.Fragment>
              <Avatar sx={{ width: 38, height: 38, margin: 1 }}>
                <InsertPhotoIcon className='msgs__icon photo_icon' />
              </Avatar>
              <Avatar sx={{ width: 38, height: 38 }}>
                <PhotoCameraIcon className='msgs__icon camera_icon' />
              </Avatar>
            </React.Fragment>
        }
      </Grid>
    </Grid>
  )
}

export default withAuthenticated(Messages)

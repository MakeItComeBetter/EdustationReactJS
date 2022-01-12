import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box } from '@mui/system';
import HeaderSection from './HeaderSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from '@mui/material/CircularProgress';

const Notifications = ({
  currentUser,
  fetchMoreNotifications,
  notifications,
  lastVisible,
  hasNotifications,
  addFriendForUser,
  updateNotifications,
  initNotifications
}) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // initNotifications(currentUser)
  }, [currentUser, initNotifications])

  const fetchMore = async () => {
    setLoading(true);
    const result = await fetchMoreNotifications(currentUser, notifications, lastVisible);
    setLoading(!result)
  }

  return (
    <Grid container>
      <HeaderSection title='Notifications' link={'/home'} iconAction={<FontAwesomeIcon icon={faSearch} />} />
      <Grid item xs={12} className='notifications__container' id="scrollableDiv"
        style={{
          height: 600
        }}>

        {/*Put the scroll bar always on the bottom*/}
        <InfiniteScroll
          dataLength={notifications?.length}
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
            notifications?.length > 0 ?

              notifications.map((v, index) => (
                <Box key={index}
                  sx={{
                    backgroundColor: v?.checked ? '' : '#77A7FF',

                  }}
                >
                  <div className='notifications__widget_main'>
                    <div className='notifications__widget_contents'>
                      <span>{v?.title}</span>
                      <small>{v?.message}</small>
                    </div>
                  </div>
                  {
                    v?.useActions ?
                      <div className='notifications__widget_actions'>
                        {
                           !v?.pending ?
                            "" :
                            <React.Fragment>
                              <button onClick={() => {
                                switch (v?.typeAction) {
                                  case 'ADD_FRIEND':
                                    addFriendForUser(currentUser, v?.author)
                                    updateNotifications(v?.id, currentUser?.uid,
                                      {
                                        accepted: true,
                                        checked: true,
                                        pending: false
                                      })
                                    break;
                                  default:
                                    break;

                                }
                              }}>Accept</button>
                              <button
                                onClick={() => {
                                  switch (v?.typeAction) {
                                    case 'ADD_FRIEND':
                                      updateNotifications(v?.id, currentUser?.uid,
                                        {
                                          checked: true,
                                          pending: false
                                        })
                                      break;
                                    default:
                                      break;

                                  }
                                }}
                              >Cancel</button>
                            </React.Fragment>
                        }
                      </div> : ""
                  }

                </Box>
              ))
              :
              <p style={{ textAlign: 'center' }}>Nothing else not having.</p>
          }
        </InfiniteScroll>
      </Grid>
    </Grid>
  )
}

export default Notifications



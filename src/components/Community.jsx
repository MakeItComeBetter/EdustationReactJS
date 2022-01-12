import React, { useEffect } from 'react';
import { Avatar, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MESSENGER_PATH } from '../constance/urlPath';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ChatIcon from '@mui/icons-material/Chat';
import { useHistory } from 'react-router-dom';
import HeaderSection from './HeaderSection';

const Community = ({ currentUser, 
  createNewNotification, 
  publicUsers, 
  getPublicUsers, 
  friends,
  createRoomByMembers
}) => {

  const navigate = useHistory();

  useEffect(() => {
    getPublicUsers();
  }, [getPublicUsers]);



  return (
    <Grid container>
      <HeaderSection title='Community' link={MESSENGER_PATH} iconAction={<FontAwesomeIcon icon={faSearch} />} />

      <Grid item xs={12} className='community'>
        {
          publicUsers && publicUsers.length > 0 ?
            publicUsers.map((v, i) => (
              <Grid item xs={6} md={2} key={i}>
                <div className="community__widget"
                  style={{
                    backgroundImage: `url(${v.photoURL ? v?.photoURL : "https://i.pinimg.com/originals/9d/ba/20/9dba20a19c514660b135f1dd831102e2.jpg"})`
                  }}
                >
                  <div className="community__widget_avt">
                    <Avatar src={v?.photoURL} alt={v?.displayName} />
                  </div>
                  {
                    v?.uid !== currentUser.uid ?
                      <div>
                        <SpeedDial
                          ariaLabel="SpeedDial test"
                          className="community__widget_actions"
                          direction='down'
                          icon={<MoreVertIcon />}
                        >
                          {
                            // check is friend of current user for action request add friend
                            friends?.filter((e) => e?.uid === v?.uid).length > 0 ?
                            ""
                            :
                            <SpeedDialAction
                            key={'Add Friend'}
                            icon={<PersonAddIcon />}
                            tooltipTitle={'Add Friend'}
                            onClick={() => createNewNotification(currentUser, v?.uid, { title: "Add Friend", message: `You having request friend from ${currentUser?.displayName}`, useActions: true, typeAction: 'ADD_FRIEND' })}

                          />
                          }
                          <SpeedDialAction
                            key={'Chat'}
                            icon={<ChatIcon />}
                            tooltipTitle={`Chat with ${v?.displayName}`}
                            onClick={() => createRoomByMembers(navigate, currentUser?.uid, [v, {displayName: currentUser?.displayName, photoURL: currentUser?.photoURL, uid: currentUser?.uid }], [v?.uid, currentUser?.uid])}
                          />
                        </SpeedDial>
                      </div> : ""
                  }
                  <div className='community__widget_in4'>
                    <span>{v?.displayName === currentUser.displayName ? "You" : v?.displayName}</span>
                  </div>
                </div>
              </Grid>
            ))
            :
            <p style={{ textAlign: 'center' }}>Not having people public</p>
        }
      </Grid>
    </Grid>
  )
}

export default Community



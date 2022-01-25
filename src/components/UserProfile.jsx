import React, { useEffect, useState } from 'react';
import withAuthenticated from './HOCs/withAuthenticated';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCamera } from "@fortawesome/free-solid-svg-icons";
import { Radar } from 'react-chartjs-2';
import { Badge, Grid, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import {
  getFS,
  getDocsFS,
  collectionFS,
} from '../firebase'
import { Link } from 'react-router-dom';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);




const UserProfile = ({ currentUser, logOut, uploadAvatar, updateCurrentUser, deleteFile, getListFiles, addUserToPublic, loginWithFacebook }) => {

  const [data, setData] = useState({ labels: [], datasets: [] });
  const [makePublic, setMakePublic] = useState(false);
  const [onChangeName, setOnChangeName] = useState(false);

  useEffect(() => {
    const data = {
      labels: ['Listening', 'Speaking', 'Reading', 'Writing', 'Persistence'],
      datasets: [
        {
          label: 'Your skills',
          data: [4, 9, 7, 5, 7],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    setData(data);


    getDocsFS(collectionFS(getFS, 'public/IN4/UIDs'))
      .then((res) => {
        const publicList = [];
        res.forEach((usr) => publicList.push(usr.data()));
        if (publicList.filter(e => e.uid === currentUser.uid).length > 0) {
          setMakePublic(true);
        }
      })

  }, [currentUser]);




  const handleSetFile = (e) => {
    const file = e.target.files[0];
    const currentData = { displayName: currentUser.displayName, photoUrl: currentUser.photoURL }

    getListFiles("avatars", false, true)
      .then(list => {

        let index = list.indexOf(`avatars/${currentUser.displayName}`);
        if (index > 0) {
          let currentPath = list[index]
          if (list.filter(e => e === currentPath).length > 0) {
            deleteFile(currentPath).then(() => {
            }).catch((error) => {
              console.error("Can not delete old avatar.")
            });
          }
        }
      }).then(() => {
        uploadAvatar(file, currentUser.displayName)
          .then(res => {
            updateCurrentUser({ ...currentData, photoURL: res })
          })
          .catch(e => alert("Fail to upload avatar."))
      })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Link to="/home" replace>
          <IconButton>
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>
        </Link>
        <span>Home</span>
      </Grid>
      <Grid item xs={12} sm={3} >
        <div className="user__profile">
          <input type="file" id="icon-button-file" onChange={(e) => handleSetFile(e)} style={{ display: 'none' }} />
          <Badge badgeContent={
            <label htmlFor="icon-button-file">
              <Avatar sx={{
                width: 40,
                height: 40
              }}> <FontAwesomeIcon icon={faCamera} color='black' /></Avatar>
            </label>
          }
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar alt={currentUser.username} sx={{
              width: 100,
              height: 100
            }} src={currentUser.photoURL ? currentUser.photoURL : "https://i.pinimg.com/originals/9d/ba/20/9dba20a19c514660b135f1dd831102e2.jpg"} />
          </Badge>
          <div>
            {
              onChangeName ?
                <div>
                  <input type='text' placeholder='Enter new your display name' onBlur={() => setOnChangeName(false)} />
                </div>
                :
                <strong onClick={() => setOnChangeName(true)}>
                  <h3>{
                    currentUser.displayName || currentUser.username || "Unknown"
                  }</h3>
                </strong>
            }
            <p>{currentUser.uid}</p>
            <small>{currentUser.email}</small>
            <IconButton onClick={() => logOut()}><FontAwesomeIcon icon={faSignOutAlt} /></IconButton>
          </div>
          {
            currentUser.photoURL && currentUser.displayName ?
              <button type="button" onClick={() => addUserToPublic(currentUser) & setMakePublic(makePublic === false ? true : true)}>{makePublic ? "Update Public" : "Public Profile"}</button> : ""
          }
        </div>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Radar
          data={data}
        />
      </Grid>
    </Grid>
  )
}

export default withAuthenticated(UserProfile)
// export default Home

import React from 'react';
import { 
  // Avatar, 
  Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  // faHome, 
  faBell, faComments } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';

import {
  MESSENGER_PATH, NOTIFICATIONS_PATH
} from '../constance/urlPath';

const BottomMenu = ({
  hasNotifications,
  notifications
}) => {

  return (
    <Grid container className="bottom__menu">
      <Grid item xs={12} className="bottom__menu_list">
        <Link to={NOTIFICATIONS_PATH}>
          <Badge badgeContent={notifications.filter((e) => e?.checked !== true)?.length} color="error">
            <FontAwesomeIcon icon={faBell} />
          </Badge>
        </Link>
        {/* <Avatar sx={{ color: 'black' }}>
          <FontAwesomeIcon icon={faHome} />
        </Avatar> */}
        <Link to={MESSENGER_PATH} replace>
          <Badge badgeContent={notifications.filter((e) => e?.checked !== true)?.length} color="error">
            <FontAwesomeIcon icon={faComments} />
          </Badge>
        </Link>
      </Grid>
    </Grid>
  )
}

export default BottomMenu

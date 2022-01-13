import React from 'react';
import {
  // Avatar, 
  Grid
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  // faHome, 
  faBell, faComments
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';

import {
  MESSENGER_PATH, NOTIFICATIONS_PATH
} from '../constance/urlPath';

const BottomMenu = ({
  hasNotifications,
  notifications,
  hasUncheckedMsgs
}) => {

  return (
    <Grid container className="bottom__menu">
      <Grid item xs={12} className="bottom__menu_list">
        <div>
          <Badge badgeContent={notifications.filter((e) => e?.checked !== true)?.length} color="error">
            <Link to={NOTIFICATIONS_PATH}>
              <FontAwesomeIcon icon={faBell} />
            </Link>
          </Badge>
        </div>
        <div>
          <Badge badgeContent={hasUncheckedMsgs} color="error">
            <Link to={MESSENGER_PATH} replace>
              <FontAwesomeIcon icon={faComments} />
            </Link>
          </Badge>
        </div>
      </Grid>
    </Grid>
  )
}

export default BottomMenu

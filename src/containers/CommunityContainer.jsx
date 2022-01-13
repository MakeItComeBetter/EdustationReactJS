import { Community } from '../components';
import { connect } from 'react-redux';
import { logOut, getPublicUsers } from '../actions/UserActions';
import { getUser } from '../selectors/CommonSelectors';
import {
  addFriendForUser,
} from '../firebase';
import { createNewNotification } from '../actions/NotificationActions'
import { createRoomByMembers } from '../actions/MessengerActions';



const mapStateToProps = state => {
  return {
    ...getUser(state),
    logOut,
    addFriendForUser,
    createNewNotification,
  };
};

export default connect(mapStateToProps, {
  getPublicUsers, createRoomByMembers
})(Community);
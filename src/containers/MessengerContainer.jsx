import { connect } from 'react-redux';
import Messenger from '../components/Messenger';
import { getUser, getMessenger } from '../selectors/CommonSelectors';
import { getUserFriends } from '../actions/UserActions';
import {
  createRoomByMembers,
  fetchMoreMessages,
  fetchMoreRooms,
  initRooms,
  deleteRoom
} from '../actions/MessengerActions';

const mapStateToProps = (state) => {
  return {
    ...getUser(state),
    ...getMessenger(state),

  }
}

export default connect(mapStateToProps,
  {
    getUserFriends,
    fetchMoreMessages,
    createRoomByMembers,
    fetchMoreRooms,
    initRooms,
    deleteRoom
  })(Messenger)
import { connect } from 'react-redux';
import Friends from '../components/Friends';
import { getUser } from '../selectors/CommonSelectors';
import { getUserFriends, unFriend } from '../actions/UserActions';
import { createRoomByMembers } from '../actions/MessengerActions';


const mapStateToProps = (state) => {
  return {
    ...getUser(state),
  }
}

export default connect(mapStateToProps, {
  getUserFriends, unFriend, createRoomByMembers})(Friends)
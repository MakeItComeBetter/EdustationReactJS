import {Notifications} from '../components';
import { connect } from 'react-redux';
import { getUser } from '../selectors/CommonSelectors';
import {
  addFriendForUser
} from '../firebase';
import {fetchMoreNotifications, updateNotifications, initNotifications} from '../actions/NotificationActions';
import {getNotifications} from '../selectors/CommonSelectors';


const mapStateToProps = state => {
  return {
    ...getUser(state),
    ...getNotifications(state),
    addFriendForUser
  };
};

export default connect(mapStateToProps, { fetchMoreNotifications, updateNotifications, initNotifications })(Notifications);
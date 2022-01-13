import { connect } from 'react-redux';
import Messages from '../components/Messages';
import { getUser, getMessenger } from '../selectors/CommonSelectors';

import {createNewMessage, fetchMoreMessages, initMessages, checkedAllMsgs} from '../actions/MessengerActions'

const mapStateToProps = (state) => {
  return {
    ...getUser(state),
    ...getMessenger(state)
  }
}

export default connect(mapStateToProps, {
  createNewMessage, 
  fetchMoreMessages, 
  initMessages,
  checkedAllMsgs
})(Messages)
import { connect } from 'react-redux';
import Home from '../components/Home';
import { getUser, getApp, getNotifications, getMessenger, getDictionary } from '../selectors/CommonSelectors';
import {getRandomSentence, addReplyQuestion} from '../actions/DictionaryActions';

const mapStateToProps = (state) => {
  return {
    ...getUser(state),
    ...getApp(state),
    ...getNotifications(state),
    ...getMessenger(state),
    ...getDictionary(state)
  }
}

export default connect(mapStateToProps, {getRandomSentence, addReplyQuestion} )(Home)
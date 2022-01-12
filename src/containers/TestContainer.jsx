import { connect } from 'react-redux';
import Test from '../components/Test';
import { getUser, getMessenger} from '../selectors/CommonSelectors';
import {initMessages, fetchMoreMessages} from '../actions/MessengerActions'


const mapStateToProps = (state) => {

  return {
    ...getUser(state),
    ...getMessenger(state)
  }
}


export default connect(mapStateToProps, {fetchMoreMessages, initMessages })(Test)
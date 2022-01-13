import { connect } from 'react-redux';
import Home from '../components/Home';
import { getUser, getApp, getNotifications, getMessenger } from '../selectors/CommonSelectors';


const mapStateToProps = (state) => {
  return {
    ...getUser(state),
    ...getApp(state),
    ...getNotifications(state),
    ...getMessenger(state)
  }
}

export default connect(mapStateToProps, )(Home)
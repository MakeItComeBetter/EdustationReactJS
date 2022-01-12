import { connect } from 'react-redux';
import Home from '../components/Home';
import { getUser, getApp, getNotifications } from '../selectors/CommonSelectors';


const mapStateToProps = (state) => {
  return {
    ...getUser(state),
    ...getApp(state),
    ...getNotifications(state)
  }
}

export default connect(mapStateToProps, )(Home)
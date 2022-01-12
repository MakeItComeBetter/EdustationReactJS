import { connect } from 'react-redux';
import { getUser } from '../selectors/CommonSelectors';
import StartScreen from '../components/StartScreen';

const mapStateToProps = (state) => {
  return {
    ...getUser(state),
  }
}



export default connect(mapStateToProps)(StartScreen)

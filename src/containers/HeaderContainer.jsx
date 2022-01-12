import {Nav} from '../components';
import { connect } from 'react-redux';
import { logOut } from '../actions/UserActions';
import { getUser } from '../selectors/CommonSelectors';



const mapStateToProps = state => {
  return {
    ...getUser(state),
    logOut
  };
};

export default connect(mapStateToProps, {  })(Nav);
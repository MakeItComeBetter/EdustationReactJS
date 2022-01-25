import Login from '../components/Login';
import { connect } from 'react-redux';
import { loginFirebase, signUpFirebase, loginWithFacebook } from '../actions/UserActions';
import {getUser} from '../selectors/CommonSelectors';

const mapStateToProps = state => {

  return {
    ...getUser(state)
  };
};

export default connect(mapStateToProps, {
  loginFirebase,
  signUpFirebase,  
  loginWithFacebook
})(Login);


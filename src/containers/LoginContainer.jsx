import Login from '../components/Login';
import { connect } from 'react-redux';
import { loginFirebase, signUpFirebase } from '../actions/UserActions';

const mapStateToProps = state => {

  return {
    ...state
  };
};

export default connect(mapStateToProps, {
  loginFirebase,
  signUpFirebase,  
})(Login);


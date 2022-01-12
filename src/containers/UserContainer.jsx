import { connect } from 'react-redux';
import {UserProfile} from '../components/';
import { getUser } from '../selectors/CommonSelectors';
import {logOut} from '../actions/UserActions';
import {uploadAvatar, deleteFile, getListFiles, addUserToPublic} from '../firebase';
import {updateCurrentUser} from '../actions/UserActions';


const mapStateToProps = (state) => {
  return {
    ...getUser(state),
    uploadAvatar,
    deleteFile,
    getListFiles,
    addUserToPublic
  }
}

export default connect(mapStateToProps, {logOut, updateCurrentUser} )(UserProfile)
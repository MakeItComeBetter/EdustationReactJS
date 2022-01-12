import {connect} from 'react-redux';
import {Subject} from '../components';
import { getUser } from '../selectors/CommonSelectors';

const mapStateToProps = (state) => {

  return {
    ...getUser(state)
  }
}

export default connect(mapStateToProps, )(Subject)
import { connect } from 'react-redux';
import Examples from '../components/Examples';
import { getUser } from '../selectors/CommonSelectors';
import {fetchExam} from '../actions/ExampleActions';

const mapStateToProps = (state) => {
  return {
    ...getUser(state),
  }
}

export default connect(mapStateToProps, {fetchExam})(Examples)
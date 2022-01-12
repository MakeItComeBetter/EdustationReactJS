import { connect } from 'react-redux';
import Example from '../components/Example';
import { getExample, getUser } from '../selectors/CommonSelectors';

const mapStateToProps = (state) => {
  return {
    ...getUser(state),
    ...getExample(state),
  }
}

export default connect(mapStateToProps, )(Example)
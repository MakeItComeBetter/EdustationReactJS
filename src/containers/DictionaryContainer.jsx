import { connect } from 'react-redux';
import Dictionary from '../components/dictionary/Dictionary';
import { getDictionary, getUser } from '../selectors/CommonSelectors';
import {addNewWord, addNewSentence} from '../actions/DictionaryActions';


const mapStateToProps = state => {
  return {
    ...getUser(state),
    ...getDictionary(state)
  };
};

export default connect(mapStateToProps, {
  addNewWord,
  addNewSentence
})(Dictionary);
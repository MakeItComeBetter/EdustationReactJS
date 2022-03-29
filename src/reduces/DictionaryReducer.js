import {
  GET_NEW_SENTENCE,
  SET_CURRENT_SUBJECT,
  CLEAR_CURRENT_QUESTION,
  SET_SEARCH_RESULT
} from "../constance/ActionTypes";

const initialState = {
  newSentence: {},
  currentSubject: "",
  botQuestions: {
    sentence: {},
    askRememberVocab: {}
  },
  searchWordResult: [],
};

export default function dictionary(state = initialState, { type, payload }) {
  switch (type) {
    case GET_NEW_SENTENCE:
      return {
        ...state,
        newSentence: payload.newSentence,
        botQuestion: {
          sentence: payload?.sentence,
          askRememberVocab: payload?.rememberVocab
        }
      };
    case SET_CURRENT_SUBJECT:
      return {
        ...state,
        currentSubject: payload.currentSubject,
      };
    case CLEAR_CURRENT_QUESTION:
      return {
        ...state,
        newSentence: {},
      };
      case SET_SEARCH_RESULT:
      return {
        ...state,
        searchWordResult: payload?.wordResult
      }
    default:
      return {
        ...state,
      };
  }
}

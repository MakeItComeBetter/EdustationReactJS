import {
  GET_NEW_SENTENCE,
  SET_CURRENT_SUBJECT,
  CLEAR_CURRENT_QUESTION,
} from "../constance/ActionTypes";

const initialState = {
  newSentence: {},
  currentSubject: "",
};

export default function dictionary(state = initialState, { type, payload }) {
  switch (type) {
    case GET_NEW_SENTENCE:
      return {
        ...state,
        newSentence: payload.newSentence,
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
    default:
      return {
        ...state,
      };
  }
}

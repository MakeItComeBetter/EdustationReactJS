import { FETCH_EXAM, CLEAR_CURRENT_EXAM } from "../constance/ActionTypes";




const initialState = {
  questions: [],
  targetTime: 0,
  windowToken: ''
}

export default function exam(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_EXAM:
      return {
        ...state,
        questions: payload.questions,
        targetTime: payload.targetTime,
        windowToken: payload.windowToken
      }
    case CLEAR_CURRENT_EXAM:
      return state;
    default:
      return state;
  }
}
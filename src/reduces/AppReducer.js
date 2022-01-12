import {
  WITH_FIREBASE, NOT_WITH_FIREBASE,
  ADD_USER_TO_APP,
  ON_SNACK,
  OFF_SNACK
} from '../constance/ActionTypes';

const initialState = {
  useFirebase: false,
  userId: null,
  snackNotify: {
    on: false,
    message: null
  }
}

export default function app(state = initialState, { type, payload }) {

  switch (type) {

    case WITH_FIREBASE:
      return {
        ...state,
        useFirebase: true
      }
    case NOT_WITH_FIREBASE:
      return {
        ...state,
        useFirebase: false
      }
    case ADD_USER_TO_APP:
      return {
        ...state,
        userId: payload.userId
      }

    case ON_SNACK:
      return {
        ...state,
        snackNotify: {
          ...state.snackNotify,
          on: true,
          message: payload?.message
        }
      }
    case OFF_SNACK:
      return {
        ...state,
        snackNotify: {
          ...state.snackNotify,
          on: false,
          message: null
        }
      }
    default:
      return state;
  }

}
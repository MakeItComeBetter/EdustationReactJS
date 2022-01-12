import {
  LOGIN_SUCCESS,
  CLEAR_USER,
  UPDATE_PROFILE,
  FETCH_FRIENDS,
  FETCH_PUBLIC_USER,
  UPDATE_FRIENDS,
  UNFRIEND
} from '../constance/ActionTypes';

const initialState = {
  currentUser: null,
  loadedAuth: false,
  friends: [],
  chatRooms: [],
  publicUsers: []
};

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: payload.user,
        loadedAuth: true
      };
    case CLEAR_USER:
      return {
        ...initialState,
        loadedAuth: true
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        currentUser: { ...state.currentUser, displayName: payload?.displayName, photoURL: payload?.photoURL }
      };
      case UPDATE_FRIENDS:
        return {
          ...state,
          friends: payload.friends
        }
    case FETCH_FRIENDS:
      return {
        ...state,
        friends: payload.friends
      }
      case UNFRIEND:
        return {
          ...state,
          // friends: state.friends.filter((f) => f.uid !== payload.removedId)
        }
      case FETCH_PUBLIC_USER:
        return {
          ...state,
          publicUsers: payload.publicUsers
        }
    default:
      return state;
  }
}

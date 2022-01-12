import {
  DELETE_MESSAGE,
  CLEAR_MESSAGES,
  SEND_MESSAGE,
  UPDATE_MESSENGER,
  FETCH_MORE_MESSAGES,
  SEND_MESSAGE_SUCCESS,
  UPDATE_MESSAGES,
  UPDATE_CURRENT_ROOM,
  FETCH_MORE_ROOMS,
  UPDATE_NEW_ROOM,
  DELETE_ROOM
} from '../constance/ActionTypes';

const initialState = {
  currentRoom: null,
  currentMessages: [],
  lastVisible: null,
  rooms: [],
  lastVisibleRoom: null
}

export default function messenger(state = initialState, { type, payload }) {
  switch (type) {

    case SEND_MESSAGE:
      return {
        ...state,
        currentMessages: [...state.currentMessages, payload.message]
      }
    case DELETE_MESSAGE:
      return {
        ...state,
        currentMessages: state.currentMessages.filter((e) => e.message !== payload.message)
      }
    case UPDATE_MESSENGER:
      return {
        ...state,
        rooms: payload?.rooms,
      }
    case FETCH_MORE_ROOMS:
      return {
        ...state,
        rooms: state.rooms.concat(payload?.rooms),
        lastVisibleRoom: payload.lastVisible
      }
    case UPDATE_NEW_ROOM:
      return {
        ...state,
        rooms: state.rooms.push(payload?.room)
      }
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((e) => e.roomId !== payload?.roomId)
      }
    case UPDATE_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: payload?.currentRoom
      }
    case FETCH_MORE_MESSAGES:
      return {
        ...state,
        currentMessages: payload.messages,
        lastVisible: payload?.lastVisible
      }
    case SEND_MESSAGE_SUCCESS:
      if (payload?.room === state.currentRoom?.roomId) {
        state.currentMessages.unshift(payload.message);
      }
      return {
        ...state,
        currentMessages: [...state.currentMessages]
      }
    case UPDATE_MESSAGES:
      return {
        ...state,
        currentMessages: payload.messages,
        lastVisible: payload?.lastVisible
      }
    case CLEAR_MESSAGES:
      return {
        ...state,
        currentMessages: [],
        lastVisible: null
      }
    default:
      return state;
  }


}
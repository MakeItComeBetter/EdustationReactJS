import {
  DELETE_MESSAGE,
  CLEAR_MESSAGES,
  SEND_MESSAGE,
  UPDATE_MESSENGER,
  FETCH_MORE_MESSAGES,
  SEND_MESSAGE_SUCCESS,
  INIT_MESSAGES,
  UPDATE_CURRENT_ROOM,
  FETCH_MORE_ROOMS,
  UPDATE_NEW_ROOM,
  DELETE_ROOM,
  CHECKED_ALL_MSGS
} from '../constance/ActionTypes';

const initialState = {
  currentRoom: null,
  currentMessages: [],
  currentUserChatting: null,
  lastVisibleMsg: null,
  rooms: [],
  lastVisibleRoom: null,
  roomsWithHasUnCheckMsg: []
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
        lastVisibleMsg: payload?.lastVisible
      }
    case SEND_MESSAGE_SUCCESS:
      let existed = state.currentMessages.filter((e) => e?.id === payload?.message?.id).length > 0;
      let newMessage = payload?.message;
      let newMsgs;
      if (payload?.room === state.currentRoom?.roomId) {

        if (existed) {
          newMsgs = state.currentMessages.filter((e) => e?.id !== newMessage?.id);
          newMsgs.unshift(newMessage);
          state.currentMessages = [...newMsgs];
        } else {
          state.currentMessages.unshift(payload.message);
        }

      }
      return {
        ...state,
        currentMessages: [...state.currentMessages],
        roomsWithHasUnCheckMsg: payload?.roomsWithHasUnCheckMsg
      }
    case INIT_MESSAGES:
      return {
        ...state,
        currentMessages: payload.messages,
        lastVisibleMsg: payload?.lastVisible,
        currentUserChatting: state.currentRoom?.membersDetails.find((e) => e?.uid !== payload?.currentUser?.uid)
      }
    case CHECKED_ALL_MSGS:
      let currentMessages = state?.currentMessages;
      for(let i; i< currentMessages.length; i ++){
        if (currentMessages[i] && currentMessages[i]?.author !== payload?.currentUser?.uid){
          currentMessages[i].checked = true;
        }
      }
      return {
        ...state,
        currentMessages: state.currentMessages,
        
      }
    case CLEAR_MESSAGES:
      return {
        ...state,
        currentRoom: null,
        currentMessages: [],
        lastVisibleMsg: null
      }
    default:
      return state;
  }


}
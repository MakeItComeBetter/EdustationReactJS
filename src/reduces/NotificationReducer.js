import {
  FETCH_MORE_NOTIFICATIONS,
  UPDATE_NOTIFICATION_SUCCESS,
  PUSH_NEW_NOTIFICATION,
  UPDATE_NOTIFICATIONS
} from '../constance/ActionTypes';

const initialState = {
  notifications: [],
  lastVisible: null,
  hasNotifications: false
}

export default function notifications(state = initialState, { type, payload }) {

  switch (type) {

    case FETCH_MORE_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload.notifications,
        lastVisible: payload.lastVisible
      }
    case PUSH_NEW_NOTIFICATION:
      state.notifications.push(payload.newNotification);
      return {
        ...state,
        notifications: [...state.notifications],
        hasNotifications: true
      }
    case UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter((e) => e?.id !== payload.notification?.id).concat(payload.notification)
          .sort((a, b) => a?.createdAt - b?.createdAt)
        ,
      }
      case UPDATE_NOTIFICATIONS:
        return {
          ...state,
          notifications: payload.notifications,
          lastVisible: payload.lastVisible
        }
    default:
      return state
  }

}
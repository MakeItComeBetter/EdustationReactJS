
import { WITH_FIREBASE, NOT_WITH_FIREBASE, 
  
 } from '../constance/ActionTypes';


export const chooseFirebase = () => ({type: WITH_FIREBASE});
export const unChooseFirebase = () => ({type: NOT_WITH_FIREBASE});



// export const subscribeNotifications = (userId) => dispatch => {
//   onSnapshot(collection(getFS, `notifications/${userId}/messages`), (snap) => {
//     const notifications = [];
//     snap.forEach((e) => {
//       notifications.push(e.data())
//     })
//     if (notifications?.length > 0){
//       dispatch({type: UPDATE_NOTIFICATIONS, payload: {notifications}})
//     }
//   })
// }


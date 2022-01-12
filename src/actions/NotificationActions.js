
import {
  collection,
  getDocs,
  startAfter,
  query,
  limit,
  orderBy,
  getDoc,
  setDoc,
  doc,
  where
} from 'firebase/firestore';
import {
  getFS
} from '../firebase';
import {
  FETCH_MORE_NOTIFICATIONS,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATIONS
} from '../constance/ActionTypes';


// make an ID
function createId(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}


export const initNotifications = (currentUser) => async dispatch => {
  let msgs = [];
  const first = query(collection(getFS, `notifications/${currentUser?.uid}/messages`), orderBy('createdAt'), limit(10))
  const docSnapshots = await getDocs(first);
  const lastVisible = docSnapshots.docs[docSnapshots.docs.length - 1];
  docSnapshots.forEach((e) => msgs.push(e.data()));
  dispatch({ type: UPDATE_NOTIFICATIONS, payload: { notifications: msgs, lastVisible: lastVisible } })
}

/*
  params: currentUser, currentNotifications
*/
export const fetchMoreNotifications = (currentUser, currentNotifications = [], lastVisibleState = null) => async dispatch => {
  let msgs = [];
  if (!lastVisibleState) return true;
  const next = query(collection(getFS, `notifications/${currentUser?.uid}/messages`),
    orderBy("createdAt", 'desc'),
    startAfter(lastVisibleState),
    limit(10));
  const nexDocSnapshots = await getDocs(next);
  const newLastVisible = nexDocSnapshots.docs[nexDocSnapshots.docs.length - 1];
  if (!newLastVisible) return true;
  nexDocSnapshots.forEach((e) => msgs.push(e.data()));
  dispatch({ type: FETCH_MORE_NOTIFICATIONS, payload: { notifications: currentNotifications.concat(msgs), lastVisible: newLastVisible } });
  return true
}

export const updateNotifications = (notificationId, targetUserUid, attributes) => dispatch => {
  
  const docRef = doc(getFS, `notifications/${targetUserUid}/messages`, notificationId);
  let notification;
  getDoc(docRef)
    .then((res) => {
      if (res.exists()) {
        notification = {
          ...res.data(),
          ...attributes
        }
        setDoc(docRef, notification);
      }else {
        return;
      }
    })
    .then(() => dispatch({ type: UPDATE_NOTIFICATION_SUCCESS, payload: { notification: notification } }))
    .catch((e) => alert(e.message));

}

export const createNewNotification = (currentUser, targetUserUid, msg) => {
  if (!targetUserUid || !currentUser || !msg) return;
  let newID = createId(currentUser?.uid?.length);
  const notificationPath = `notifications/${targetUserUid}/messages`;

  const q = query(collection(getFS, notificationPath), where('checked', '==', false))
  // check existed notification
  getDocs(q)
    .then((res) => {
      if (res?.docs.length > 0) {
        res.forEach((e) => {
          if (e?.data().typeAction === msg?.typeAction) {
            return;
          } else {
            setDoc(doc(getFS, notificationPath, newID),
              {
                id: newID,
                title: msg?.title,
                message: msg?.message,
                checked: false,
                accepted: false,
                pending: true,
                canceled: false,
                typeAction: msg?.typeAction,
                useActions: msg?.useActions,
                author: {
                  displayName: currentUser?.displayName,
                  photoURL: currentUser?.photoURL,
                  uid: currentUser?.uid
                },
                createdAt: Date.now()
              }
            ).catch((e) => console.error(e.message))

          }
        })
      } else {
        setDoc(doc(getFS, notificationPath, newID),
          {
            id: newID,
            title: msg?.title,
            message: msg?.message,
            checked: false,
            accepted: false,
            pending: true,
            canceled: false,
            typeAction: msg?.typeAction,
            useActions: msg?.useActions,
            author: {
              displayName: currentUser?.displayName,
              photoURL: currentUser?.photoURL,
              uid: currentUser?.uid
            },
            createdAt: Date.now()
          }
        ).catch((e) => console.error(e.message))

      }


    })


}



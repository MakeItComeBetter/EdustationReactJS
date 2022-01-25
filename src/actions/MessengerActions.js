import {
  collection,
  getDocs,
  startAfter,
  query,
  limit,
  orderBy,
  getDoc,
  doc,
  where,
  setDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import {
  FETCH_MORE_MESSAGES,
  UPDATE_MESSENGER,
  UPDATE_CURRENT_ROOM,
  INIT_MESSAGES,
  CLEAR_MESSAGES,
  FETCH_MORE_ROOMS,
  DELETE_ROOM,
  CHECKED_ALL_MSGS,
  ON_SNACK
} from '../constance/ActionTypes';
import { getFS } from "../firebase";

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

export const initMessages = (roomId, currentUser) => async dispatch => {

  if (!roomId) return;
  const currentRoom = await getDoc(doc(getFS, `chats/${roomId}`));
  dispatch({ type: UPDATE_CURRENT_ROOM, payload: { currentRoom: currentRoom.data() } })
  if (!roomId) return;
  const first = query(collection(getFS, `chats/${roomId}/messages`), orderBy('createdAt', 'desc'), limit(15));
  const docSnapshots = await getDocs(first);
  const lastVisible = docSnapshots.docs[docSnapshots.docs.length - 1];
  if (!lastVisible) return;
  const msgs = [];
  docSnapshots.docs.map((e) => 
    msgs.push(e.data()));

  dispatch({ type: INIT_MESSAGES, payload: { messages: msgs, lastVisible: lastVisible, currentUser: currentUser } });

}

export const clearCurrentRoomData = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGES })
}

export const fetchMoreMessages = (roomId, lastVisibleState = null, currentMessages = []) => async dispatch => {
  let msgs = [];
  if (!roomId || !lastVisibleState || currentMessages.length === 0) return true;
  const next = query(collection(getFS, `chats/${roomId}/messages`),
    orderBy("createdAt", 'desc'),
    startAfter(lastVisibleState),
    limit(10));
  const nexDocSnapshots = await getDocs(next);
  const newLastVisible = nexDocSnapshots.docs[nexDocSnapshots.docs.length - 1];
  if (!newLastVisible) return true;
  nexDocSnapshots.forEach((e) => msgs.push(e.data()));
  dispatch({ type: FETCH_MORE_MESSAGES, payload: { messages: currentMessages.concat(msgs), lastVisible: newLastVisible } });
  return true
}

export const createNewMessage = (roomId, message, authorId) => dispatch => {
  if (!roomId || !authorId || message.trim().length === 0) return;
  let newMsgId = createId(10);

  let newMsg = {
    id: newMsgId,
    message: message,
    author: authorId,
    checked: false,
    createdAt: Date.now()
  }
  // dispatch({ type: SEND_MESSAGE_SUCCESS, payload: { message: newMsg } })

  const messagesPath = `chats/${roomId}/messages`;
  // check room exist
  const docRef = doc(getFS, 'chats', roomId)
  getDoc(docRef)
    .then((res) => {
      if (res.exists()) {
        setDoc(doc(getFS, messagesPath, newMsgId), newMsg)
          .then(() => {
          })
          .catch((e) => console.log(e.message))
      }
    })
    .catch((e) => alert(e.message));

}

export const checkedAllMsgs = (currentUser, roomId, currentMessages = []) => dispatch => {
  
  if (!currentUser || !roomId || currentMessages?.filter((e) => e?.checked === false)?.length === 0) return;

  const q = query(collection(getFS, `chats/${roomId}/messages`), where('author', '!=', `${currentUser?.uid}`), where('checked', '==', false));
  getDocs(q)
    .then((res) => {
      res.docs.forEach((e) => {
        updateDoc(doc(getFS, `chats/${roomId}/messages/${e?.id}`), {
          ...e.data(),
          checked: true
        }).then(() => {
        })
      })
    }).then(() => {
      dispatch({ type: CHECKED_ALL_MSGS })
    })
}

export const createRoomByMembers = (navigate, authorId, membersDetails = [], members = []) => dispatch => {
  if (!navigate || !authorId || membersDetails?.length === 0 || members?.length === 0) return;
  let room;
  const q = query(collection(getFS, `chats`), where('members', 'array-contains', `${authorId}`));
  getDocs(q)
    .then((res) => {
      let currentRooms = [];
      res.forEach((e) => {
        currentRooms.push(e.data())
      });
      room = currentRooms.find((e) => JSON.stringify(e?.members.sort()) === JSON.stringify(members.sort()));

    })
    .then(() => {
      if (room) {
        navigate?.push(`/messages/${room?.roomId}`);
      } else {
        // room not existed

        let newRoomId = createId(10);
        let currentRoom = {
          createdAt: Date.now(),
          members: members,
          roomId: newRoomId,
          membersDetails: membersDetails
        }
        setDoc(doc(getFS, `chats`, newRoomId), currentRoom)
          .then(() => {
            dispatch({ type: UPDATE_CURRENT_ROOM, payload: { currentRoom: currentRoom } });
            navigate?.push(`/messages/${newRoomId}`);
          })
      }

    })



}

export const initRooms = (currentUser) => dispatch => {

  const first = query(collection(getFS, `chats`), where('members', 'array-contains', `${currentUser?.uid}`),
    orderBy('createdAt', 'desc'), limit(10));
  getDocs(first)
    .then((res) => {
      const rooms = [];
      res.forEach((e) => {
        rooms.push(e.data())
      });
      dispatch({ type: UPDATE_MESSENGER, payload: { rooms: rooms, lastVisible: res.docs[res.docs.length - 1] } })
    })
    .catch((e) => {
      console.log(e.message)
    })

}

export const fetchMoreRooms = (currentUser, lastVisibleRoomState = null, currentRooms = []) => async dispatch => {
  const next = query(collection(getFS, `chats`), where('members', 'array-contains', `${currentUser?.uid}`,
    orderBy('createdAt', 'desc'),
    startAfter(lastVisibleRoomState),
    limit(5)))
  let rooms = [];
  if (!currentUser || !lastVisibleRoomState || currentRooms.length === 0) return true;

  const nexDocSnapshots = await getDocs(next);
  const newLastVisible = nexDocSnapshots.docs[nexDocSnapshots.docs.length - 1];
  if (!newLastVisible) return true;
  nexDocSnapshots.forEach((e) => rooms.push(e.data()));
  dispatch({ type: FETCH_MORE_ROOMS, payload: { rooms: rooms, lastVisibleRoom: newLastVisible } });
  return true
}

export const deleteRoom = (roomId) => dispatch => {
  deleteDoc(doc(getFS, `chats/${roomId}`))
    .then(() => {
      dispatch({ type: DELETE_ROOM, payload: { roomId } })
    })
    .then(() => {
      dispatch({type: ON_SNACK, payload: {message: `Deleted ${roomId}`}})
    })
}
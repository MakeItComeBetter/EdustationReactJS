import {
  LOGIN_SUCCESS,
  CLEAR_USER,
  UPDATE_PROFILE,
  FETCH_FRIENDS,
  FETCH_PUBLIC_USER,
  ADD_USER_TO_APP,
  UNFRIEND,
  ON_SNACK
} from '../constance/ActionTypes';
import { BASE_PATH } from '../constance/urlPath';
import {
  auth,
  getFS,
  // firebaseApp
} from '../firebase';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';

import {
  signInWithEmailAndPassword,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: { user } });
const clearUser = () => ({ type: CLEAR_USER });
const addUserIdToApp = userId => ({ type: ADD_USER_TO_APP, payload: { userId } })

export const logOut = () => async dispatch => {
  await auth.signOut();
  dispatch(clearUser());
};

export const authenticate = () => async (dispatch) => {
  return auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(loginSuccess(user));
      dispatch(addUserIdToApp(user?.uid))
    } else {
      dispatch(clearUser());
    }
  })
};

export const loginFirebase = (navigator, email, password) => dispatch => {
  let user = null;
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      if (res?.user) {
        user = res?.user;

        if (user?.emailVerified === true) {
          dispatch(loginSuccess(user));
          navigator?.push(BASE_PATH);
        } else {
          dispatch({ type: ON_SNACK, payload: { message: "This account hasn't still verify. Please check your email.", on: true } })
        }
      } else {
        dispatch(clearUser());
      }
    })
}



export const signUpFirebase = (navigator, username, email, password) => async dispatch => {

  


  // check mail taken
  const res = await fetchSignInMethodsForEmail(auth, email)
  if (res && res.length > 0) {
    throw new Error("This email has already taken.");
  }

  //check username taken

  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const user = res?.user;
      updateUser({ displayName: username })
        .then(() => {

          

          sendEmailVerification(user)
            .then(() => {
              dispatch({ type: ON_SNACK, payload: { message: "Please check mail and verify is you before sign in.", on: true } })
              if (isSignInWithEmailLink(auth, window.location.href)) {

                // The client SDK will parse the code from the link for you.
                signInWithEmailLink(auth, email, window.location.href)
                  .then((res) => {
                    if (res?.user){
                      dispatch(loginSuccess(user));
                      navigator?.push(BASE_PATH);
                    }else {

                    }
                  })
              }
            })

        })
    })
}

export const updateUser = (attributes) => {
  const { currentUser } = auth;
  if (currentUser) {
    return updateProfile(currentUser, { ...attributes })
  } else {
    return "User not available."
  }
}

export const updateCurrentUser = (attributes) => async dispatch => {
  try {
    updateUser({ ...attributes });
    dispatch({ type: UPDATE_PROFILE, payload: { photoURL: attributes?.photoURL, displayName: attributes?.displayName } })
  } catch (e) {
    throw new Error("Ops. Can not update your information.")
  }
}

// PEOPLE

export const getPublicUsers = () => dispatch => {
  let users = [];
  getDocs(collection(getFS, `public/IN4/UIDs`))
    .then((res) => res.forEach((e) => users.push(e.data())))
    .then(() => dispatch({ type: FETCH_PUBLIC_USER, payload: { publicUsers: users } }))
    .catch((e) => console.error(e.messages));

}

export const getUserFriends = (currentUser) => dispatch => {
  // get friends of user
  const friends = [];

  getDocs(collection(getFS, `users/${currentUser?.uid}/friends`))
    .then(res => {
      res.forEach(e => {
        friends.push(e.data())
      });
    })
    .then(() => {
      dispatch({ type: FETCH_FRIENDS, payload: { friends: friends } })
    })

    .catch(e => console.error(e.messages))

}

export const unFriend = (currentUser, targetUserId) => dispatch => {

  const q = query(collection(getFS, `users/${currentUser?.uid}/friends`), where('uid', '==', targetUserId))

  getDocs(q)
    .then((res) => {
      res.forEach((e) => {
        if (e.exists()) {
          deleteDoc(e.ref)
            .then(() => {
              const q2 = query(collection(getFS, `users/${targetUserId}/friends`), where('uid', '==', currentUser?.uid))
              getDocs(q2)
                .then((res) => {
                  res.forEach((e) => {
                    if (e.exists()) {
                      deleteDoc(e.ref)
                        .then(() => {
                          dispatch({ type: UNFRIEND })
                        })
                    }
                  })
                })
            })
        }
      })
    })


}








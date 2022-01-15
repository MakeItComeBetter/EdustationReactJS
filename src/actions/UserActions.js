import {
  LOGIN_SUCCESS,
  CLEAR_USER,
  UPDATE_PROFILE,
  FETCH_FRIENDS,
  FETCH_PUBLIC_USER,
  ADD_USER_TO_APP,
  UNFRIEND,
  ON_SNACK,
  
} from '../constance/ActionTypes';
import { BASE_PATH } from '../constance/urlPath';
import {
  auth,
  getFS,
  // firebaseApp
} from '../firebase';
import { collection, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  setDoc, 
  getDoc,
  where } from 'firebase/firestore';

import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  deleteUser
} from "firebase/auth";

const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: {user: user} });
const clearUser = () => ({ type: CLEAR_USER });
const addUserIdToApp = userId => ({ type: ADD_USER_TO_APP, payload: { userId } })

export const logOut = () => async dispatch => {
  await auth.signOut();
  const {currentUser} = auth;
  setUserIsOnline(currentUser, true)
  dispatch(clearUser());
};

export const authenticate = () => async (dispatch) => {
  return auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(loginSuccess(user));
      dispatch(addUserIdToApp(user?.uid));
      setUserIsOnline(user, true);
    } else {
      setUserIsOnline(user, false)
      dispatch(clearUser());
    }
  })
};

const setUserIsOnline = (currentUser, isOnline) => {
  setDoc(doc(getFS, `users/${currentUser?.uid}`), {
    isOnline: isOnline
  })
}

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

export const deleteAccount = (navigator, currentUser) => {
  return deleteUser(currentUser)
    .then(() => {
      navigator?.push(BASE_PATH);
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

          const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: `https://edustation-2f482.web.app/#/`,
            // This must be true.
            handleCodeInApp: true,
            // dynamicLinkDomain: 'example.page.link'
          };

          sendEmailVerification(user, actionCodeSettings)
            .then(() => {
              window.localStorage.setItem("emailForSignIn", email);
              dispatch({ type: ON_SNACK, payload: { message: "Please check mail and sure verify is you before sign in.", on: true } });
              setTimeout(() => {
                window.close()
              }, 5000)
            })
        })
    })
}

export const sentForgotPassword = (email) => dispatch => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `https://edustation-2f482.web.app/#/`,
    // This must be true.
    handleCodeInApp: true,
    // dynamicLinkDomain: 'example.page.link'
  };
  return sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      dispatch({ type: ON_SNACK, payload: { message: "Please check mail and get new password.", on: true } });
      // setTimeout(() => {
      //   window.close()
      // }, 5000)
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
      res.forEach((v) => {

        getDoc(doc(getFS, `users/${v?.data()?.uid}`))
          .then((m) => {
            let friend = {
              ...v?.data(),
              isOnline: m?.data()?.isOnline ? true : false
            }
            friends.push(friend);
          }).catch((e) => console.log("Fail to check user online.", e.message))
      })
      dispatch({ type: FETCH_FRIENDS, payload: { friends: friends } })
    })
    .then(() => {
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








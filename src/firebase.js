import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import { initializeApp } from "firebase/app"
import {
  getAuth
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable
} from 'firebase/storage'

import {
  getDatabase,
  ref as refer,
  set as setDataRealTime,
  // query,
  onChildAdded,
  onValue,
  orderByChild,
  orderByValue,
  off,
  push
} from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyD5BidsXAqtSmsKgaGYQpwyV3W6EkEGAFc",
  authDomain: "edustation-2f482.firebaseapp.com",
  projectId: "edustation-2f482",
  storageBucket: "edustation-2f482.appspot.com",
  messagingSenderId: "41478612240",
  appId: "1:41478612240:web:4175a65cc2a14b9ce67195",
  measurementId: "G-BC8WS6STZS"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const realtime = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);

// FIRE STORE EXPORT
export const getFS = getFirestore(firebaseApp);
export const collectionFS = collection;
export const getDocsFS = getDocs;
export const getDocFS = getDoc;
export const setDocFS = setDoc;
export const addDocFS = addDoc;
export const docFS = doc;
export const onSnapshotFS = onSnapshot;
export const queryFS = query;
export const orderByFS = orderBy;
export const limitFS = limit;
export const startAfterFS = startAfter;




// REALTIME DATABASE EXPORT
export const realtimeDB = getDatabase(firebaseApp);
export const setRealTime = setDataRealTime;
export const onAddChild = onChildAdded;
export const onValueObserver = onValue;
export const referentDB = refer;
export const queryDB = query;
export const orderByChildDB = orderByChild;
export const orderByValueDB = orderByValue;
export const offDBQuery = off;
export const pushData = push;


export const addUserToPublic = (currentUser) => {
  if (!currentUser.photoURL && !currentUser.displayName) {
    throw new Error("Please update your information before do this action.")
  } else {
    setDocFS(docFS(getFS, 'public/IN4/UIDs', `${currentUser.uid}`), {
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      uid: currentUser.uid
    }).then(res => {

    }).catch((e) => console.error("Fails to public this user"))
  }
}

export const addFriendForUser = (currentUser, anotherUser) => {
  if (!currentUser || !anotherUser) return;
  const friends = [];
  getDocsFS(collectionFS(getFS, `users/${currentUser.uid}/friends`))
    .then(res => {
      res.forEach(e => friends.push(e.data()));
      setDocFS(docFS(getFS, `users/${currentUser.uid}/friends`, `${friends.length + 1}`), {
        displayName: anotherUser.displayName,
        photoURL: anotherUser.photoURL,
        uid: anotherUser.uid
      }
      )
        .catch(e => console.error(e.message))
    })
    .catch((e) => console.error(e.message))
  getDocsFS(collectionFS(getFS, `users/${anotherUser.uid}/friends`))
    .then(res => {
      res.forEach(e => friends.push(e.data()));
      setDocFS(docFS(getFS, `users/${anotherUser.uid}/friends`, `${friends.length + 1}`), {
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid
      }
      )
        .catch(e => console.error(e.message))
    })
    .catch((e) => console.error(e.message))
}


// STORAGE
export const uploadAndGetFullPath = async (fileData, folder, fileName) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${folder}/${fileName}`);

  const uploadTask = uploadBytesResumable(storageRef, fileData);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          console.log("Somethings wrong?")
      }
    },
    (error) => {
      console.error("Upload process failure.")
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }

  );
}

export const uploadAvatar = async (file, username) => {
  const storage = getStorage();
  const storageRef = ref(storage, `avatars/${username}`);
  const fileRef = await uploadBytes(storageRef, file);
  return await getDownloadURL(fileRef.ref);

}

export const uploadFileBlob = (fileData, folder, fileName) => {
  const storage = getStorage();
  const filesPath = `${folder}`;
  const storageRef = ref(storage, `${folder}/${fileName}`);

  // check uniq file
  const listRef = ref(storage, filesPath);
  const items = [];
  let uniqFileName = true;
  listAll(listRef)
    .then(res => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        items.push(itemRef);
      });
    }).then(
      () => {
        items.forEach(e => {
          let arr = String(e).split("/");
          if (arr.filter(e => e === fileName).length > 0) {
            uniqFileName = false;
          }
        })
      }
    ).then(() => {
      if (!uniqFileName) {
        throw new Error("File name is exists!")
      } else {
        uploadBytes(storageRef, fileData).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
          console.log('Uploaded a blob or file!');
        });
      }
    }).catch(e => console.error("You don't have permission for this action."))

}

export const getListFiles = async (filesPath, getFolder, getItems) => {
  const storage = getStorage();
  const listRef = ref(storage, filesPath);
  const items = [];
  const folders = [];
  const res = await listAll(listRef);

  if (getItems) {
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      items.push(itemRef.fullPath);
    });

  }
  if (getFolder) {
    res.prefixes.forEach((folderRef) => {
      folders.push(folderRef.fullPath);
    })
  }
  if (getFolder) return folders;
  if (getItems) return items;
}

export const deleteFile = async (filePath) => {
  const storage = getStorage();
  const desertRef = ref(storage, filePath);

  return await deleteObject(desertRef);
}

// download file
export const downloadFile = async (fileName) => {
  const storage = getStorage();
  // let urlPath = "";
  return await getDownloadURL(ref(storage, fileName))
  // .then((url) => {

  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = (event) => {
  //     // const blob = xhr.response;
  //     // console.log("blob", blob)
  //   };
  //   xhr.open('GET', url);
  //   xhr.send();

  //   // download
  //   urlPath = url;
  //   // const link = document.createElement("a");
  //   // link.href = url;
  //   // link.download = fileName;
  //   // link.style.display = "none";
  //   // link.click();
  // })
  // .then(() => {
  //   return urlPath;
  // })
  // .catch((error) => {

  //   switch (error.code) {
  //     case 'storage/object-not-found':
  //       console.error("Fail to find this file.")
  //       break;
  //     case 'storage/unauthorized':
  //       console.error("No permission for this action")
  //       break;
  //     case 'storage/canceled':
  //       console.error("Canceled by user")
  //       break;

  //     // ...
  //     case 'storage/unknown':
  //       console.log("Something unknown")
  //       break;
  //     default:

  //   }
  // });
}





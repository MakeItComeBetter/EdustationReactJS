import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { getFS } from "../firebase";
import {
  GET_NEW_SENTENCE,
  CLEAR_CURRENT_QUESTION,
  ON_SNACK,
} from "../constance/ActionTypes";

// make an ID
function createId(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const addNewWord = (word, author, subject) => (dispatch) => {
  if (!word || !author || !subject) {
    dispatch({
      type: ON_SNACK,
      payload: { message: "Failed to add new word success", severity: 'error' },
    });
    return;
  }

  let newID = createId(author?.uid?.length);
  setDoc(doc(getFS, `/dictionaries/${subject}/words`, newID), word)
    .then(() => {
      dispatch({
        type: ON_SNACK,
        payload: { message: "Add new word success", severity: 'success' },
      });
    })
    .catch(() =>
      dispatch({ type: ON_SNACK, payload: { message: "Add new word fail", severity: 'error' } })
    );
};

export const addNewSentence = (sentence, subject, author) => (dispatch) => {
  if (!sentence || !subject || !author) {
    dispatch({
      type: ON_SNACK,
      payload: { message: "Failed to add new sentence", severity: 'error' },
    });
    return;
  }
  let newID = createId(author?.uid?.length);
  setDoc(
    doc(getFS, `/dictionaries/${subject}/sentences`, newID),
    sentence
  ).then(() => {
    dispatch({
      type: ON_SNACK,
      payload: { message: "Add new sentence success", severity: 'success' },
    });
  }).catch((e) => {
    dispatch({
      type: ON_SNACK,
      payload: { message: "Failed to add new sentence success", severity: 'error' },
    });
  })
};

export const getRandomSentence = (subject) => (dispatch) => {
  const q = query(
    collection(getFS, `/dictionaries/${subject}/sentences`),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  function randomIntFromInterval(min = 2, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getDocs(q).then((res) => {
    let results = [];
    res.docs.forEach((doc) => {
      results.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    let newSentence = results[randomIntFromInterval(1, results.length)];
    if (!newSentence) {
      newSentence = results[results.length - 1];
    }
    dispatch({ type: GET_NEW_SENTENCE, payload: { newSentence: newSentence } });
  });
};

export const addReplyQuestion = (idQuestion, subject, answer) => (dispatch) => {
  if (!idQuestion || !answer || !subject) return;

  const docRef = doc(getFS, `/dictionaries/${subject}/sentences/${idQuestion}`);

  getDoc(docRef).then((doc) => {
    const answers = doc?.data()?.answers;
    answers?.push({ content: answer, checked: false });
    setDoc(docRef, {
      ...doc.data(),
      answers: answers,
    }).then(() => {
      dispatch({ type: CLEAR_CURRENT_QUESTION });
      dispatch({
        type: ON_SNACK,
        payload: { message: "Send success", severity: 'success' },
      });
    }).catch(() => {
      dispatch({
        type: ON_SNACK,
        payload: { message: "Failed reply :(", severity: 'error' },
      });
    })
  });
};

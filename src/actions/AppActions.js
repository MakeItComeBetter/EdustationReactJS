
import { WITH_FIREBASE, NOT_WITH_FIREBASE, 
  
 } from '../constance/ActionTypes';


export const chooseFirebase = () => ({type: WITH_FIREBASE});
export const unChooseFirebase = () => ({type: NOT_WITH_FIREBASE});
import { combineReducers } from 'redux';
// import GamesReducer from './GamesReducer';
// import RouterReducer from './RouterReducer';
import AppReducer from './AppReducer';
import UserReducer from './UserReducer';
import ExampleReducer from './ExampleReducer';
import MessengerReducer from './MessengerReducer';
import NotificationReducer from './NotificationReducer';
import DictionaryReducer from './DictionaryReducer';
import Web3Reducer from './Web3Reducer';


// import profileReducer from './ProfileReducer';

export default combineReducers({
  // games: GamesReducer,
  // router: RouterReducer,
  app: AppReducer,
  user: UserReducer,
  exam: ExampleReducer,
  messenger: MessengerReducer,
  notification: NotificationReducer,
  dictionary: DictionaryReducer,
  web3: Web3Reducer
});

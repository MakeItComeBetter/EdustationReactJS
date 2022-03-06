import { lazy } from 'react';
import { HOME_PATH, 
  SUBJECT_PATH, 
  EXAMPLE_PATH, 
  EXAMPLES_PATH, 
  LOGIN_PATH, 
  USER_PATH, 
  BASE_PATH, 
  MESSENGER_PATH, 
  MESSAGES_PATH,
  COMMUNITY_PATH,
  NOTIFICATIONS_PATH,
  FRIENDS_PATH,
  DICTIONARY_PATH
 } from './constance/urlPath';
 
import PublicLayout from './layouts/PublicLayout'

const LoginContainer = lazy(() => import('./containers/LoginContainer'));
const UserContainer = lazy(() => import('./containers/UserContainer'));
const HomeContainer = lazy(() => import('./containers/HomeContainer'));
const StartContainer = lazy(() => import('./containers/StartContainer'));
const SubjectContainer = lazy(() => import('./containers/SubjectContainer'));
const ExamplesContainer = lazy(() => import('./containers/ExamplesContainer'));
const ExampleContainer = lazy(() => import('./containers/ExampleContainer'));
const MessengerContainer = lazy(() => import('./containers/MessengerContainer'));
const MessagesContainer = lazy(() => import('./containers/MessagesContainer'));
const CommunityContainer = lazy(() => import('./containers/CommunityContainer'));
const NotificationsContainer = lazy(() => import('./containers/NotificationsContainer'));
const FriendsContainer = lazy(() => import('./containers/FriendsContainer'));
const DictionaryContainer = lazy(() => import('./containers/DictionaryContainer'));


const TestContainer = lazy(() => import('./containers/TestContainer'));


const NotFound = lazy(() => import('./containers/NotFound'));


export const routes = [
  {
    path: BASE_PATH,
    component: StartContainer,
    exact: true,
    layout: PublicLayout,
  },
  {
    path: HOME_PATH,
    component: HomeContainer,
    exact: true,
    layout: PublicLayout,
  }
  ,
  {
    path: LOGIN_PATH,
    component: LoginContainer,
    exact: true,
    layout: PublicLayout,
  },
  {
    path: USER_PATH,
    component: UserContainer,
    exact: true,
    layout: PublicLayout,
  },
  {
    path: SUBJECT_PATH,
    layout: PublicLayout,
    component: SubjectContainer
  },
  {
    path: EXAMPLES_PATH,
    layout: PublicLayout,
    component: ExamplesContainer
  },
  {
    path: MESSENGER_PATH,
    layout: PublicLayout,
    component: MessengerContainer
  },
  {
    path: MESSAGES_PATH,
    layout: PublicLayout,
    component: MessagesContainer
  },
  {
    path: EXAMPLE_PATH,
    layout: PublicLayout,
    component: ExampleContainer
  },
  {
    path: COMMUNITY_PATH,
    layout: PublicLayout,
    component: CommunityContainer
  },
  {
    path: FRIENDS_PATH,
    layout: PublicLayout,
    component: FriendsContainer
  },
  {
    path: NOTIFICATIONS_PATH,
    layout: PublicLayout,
    component: NotificationsContainer
  },
  {
    path: DICTIONARY_PATH,
    layout: PublicLayout,
    component: DictionaryContainer
  },
  // {
  //   path: MAP_PATH,
  //   layout: PublicLayout,
  //   component: MapContainer
  // },
  {
    path: '/test',
    layout: PublicLayout,
    component: TestContainer
  },
  {
    path: '*',
    layout: PublicLayout,
    component: NotFound
  }
];
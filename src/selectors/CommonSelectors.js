// GAMES
export const getGames = state => state.games;

// ROUTER
export const getGenre = state => {
  const { query, tag, genre } = state.router.route.options;
  return query || tag ? '' : genre || 'action';
};

export const getSearch = state => state.router.route.options.query;

export const getSlug = state => state.router.route.keys.slug || '';

export const getTag = state => {
  return state.router.route.options.tag;
};

export const getUsername = state => state.router.route.keys.username;

// APP
export const getWindowSize = state => state.app.windowSize;
export const getChooseUseFirebase = state => state.app.useFirebase;

// USER
export const getUser = state => state.user;

export const getLikes = state => state.user.likes;

export const getIsAuthenticated = state => !!state.user.currentUser;
export const getApp = state => state.app;

// USER PROFILE
export const getUserProfile = state => state.profile;

//EXAMPLE
export const getExample = state => state.exam;

// MESSAGES

export const getNotifications = state => state.notification;

export const getMessenger = state => state.messenger;


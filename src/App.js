import React, { useCallback, useEffect } from "react";
import PublicRoute from "./layouts/PublicRoute";
import { HashRouter, Switch } from "react-router-dom";
import { routes } from "./routes";
import { connect } from "react-redux";
import { authenticate } from "./actions/UserActions";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getFS } from "./firebase";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

import {
  // UPDATE_NOTIFICATIONS,
  // UPDATE_NEW_ROOM,
  SEND_MESSAGE_SUCCESS,
  OFF_SNACK,
  UPDATE_FRIENDS,
  PUSH_NEW_NOTIFICATION,
} from "./constance/ActionTypes";
import { Alert } from "@mui/material";

function App({ authenticate, userId, snackNotify }) {
  const dispatch = useDispatch();

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  useEffect(() => {
    // subscribe push new notifications
    const unsubscribeNotifications = onSnapshot(
      collection(getFS, `notifications/${userId}/messages`),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            dispatch({
              type: PUSH_NEW_NOTIFICATION,
              payload: { newNotification: change.doc.data() },
            });
          }
        });
      }
    );

    // subscribe push new message
    const q = query(
      collection(getFS, `chats`),
      where("members", "array-contains", `${userId}`),
      orderBy("createdAt", "desc")
    );
    const unsubscribeRooms = onSnapshot(q, (snap) => {
      let roomHasChanged = [];
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          let roomId = change.doc.id;
          onSnapshot(
            query(
              collection(getFS, `chats/${roomId}/messages`),
              orderBy("createdAt", "desc")
            ),
            (snap) => {
              const lastMessage = snap.docs[0]?.data();
              const unCheckedMsgs = snap.docs.filter(
                (doc) =>
                  doc.data()?.checked === false && doc.data()?.author !== userId
              ).length;

              if (roomHasChanged?.length > 0) {
                if (
                  roomHasChanged.filter((e) => e.room === roomId).length > 0
                ) {
                  roomHasChanged = roomHasChanged.filter(
                    (e) => e.room !== roomId
                  );
                  roomHasChanged.push({
                    room: roomId,
                    hasUncheckedMsgs: unCheckedMsgs,
                  });
                } else {
                  roomHasChanged.push({
                    room: roomId,
                    hasUncheckedMsgs: unCheckedMsgs,
                  });
                }
              } else {
                roomHasChanged.push({
                  room: roomId,
                  hasUncheckedMsgs: unCheckedMsgs,
                });
              }
              dispatch({
                type: SEND_MESSAGE_SUCCESS,
                payload: {
                  message: lastMessage,
                  room: roomId,
                  roomsWithHasUnCheckMsg: roomHasChanged,
                },
              });
            }
          );
        }
      });
    });

    // subscribe current user data changes

    // FRIENDS
    const unsubscribeUserChanges = onSnapshot(
      collection(getFS, `users/${userId}/friends`),
      (snap) => {
        const friends = [];
        snap.forEach((doc) => {
          friends.push(doc.data());
        });
        dispatch({ type: UPDATE_FRIENDS, payload: { friends } });
      }
    );

    return () => {
      unsubscribeRooms();
      unsubscribeNotifications();
      unsubscribeUserChanges();
    };
  }, [dispatch, userId]);

  useEffect(() => {
    window.onbeforeunload = function(e){
      var message = 'Important: Please click on \'Save\' button to leave this page.';
      if (typeof e == 'undefined') {
          e = window.event;
      }
      if (e) {
          e.returnValue = message;
      }
      return message;
    }
  }, [userId])

  const renderRoutes = useCallback((routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        const { path, exact, layout, component } = route;

        return (
          <PublicRoute
            key={index}
            path={path}
            exact={exact}
            layout={layout}
            component={component}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  }, []);

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleOffSnack = () => {
    setTimeout(() => dispatch({ type: OFF_SNACK }), 1500);
  };

  return (
    <HashRouter basename="/">
      <div className="App">
        {/* <HeaderContainer /> */}
        {renderRoutes(routes)}
      </div>
      {snackNotify?.on && snackNotify?.message ? (
        <Snackbar
          open={snackNotify?.on && snackNotify?.message ? true : false}
          onClose={handleOffSnack}
          TransitionComponent={TransitionUp}
          autoHideDuration={1500}
          key={"up"}
        >
        <Alert severity={snackNotify?.severity}>{snackNotify?.message}</Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </HashRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    ...state.app,
  };
};

export default connect(mapStateToProps, { authenticate })(App);

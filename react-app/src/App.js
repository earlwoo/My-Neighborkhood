import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Splash from "./components/splash/Splash";
import Main from "./components/main/Main";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import { authenticate } from "./store/session";
import ProfileModal from "./components/drawers/ProfileModal"
import MessageModal from "./components/drawers/MessageModal";

import Footer from "./components/Footer";

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(authenticate());
      setLoaded(true);
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
        <NavBar />
      <Switch>
        <Route path="/" exact={true} >
          <Splash />
        </Route>
        <ProtectedRoute path="/main" exact={true} >
          <Main />
        </ProtectedRoute>
      </Switch>
        <Footer />
    </BrowserRouter>
  );
}

export default App;

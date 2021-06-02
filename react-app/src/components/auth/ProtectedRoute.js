import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  
  return (
    <Route {...props}>
      {(user) ? props.children  : <Redirect to="/login" />}
    </Route>
  )
};


export default ProtectedRoute;

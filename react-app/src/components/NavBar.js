import React from 'react';
import { NavLink } from 'react-router-dom';
import { login } from "../store/session"
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal'
import SignUpFormModal from './auth/SignUpFormModal'
import "./NavBar.css"
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };

  const noUser = () => {
    return (
      <>
        <span>
          <LoginFormModal />
        </span>
        <span>
          <SignUpFormModal />
        </span>
        <span>
          <button onClick={onLogin}>Demo User</button>
        </span>
      </>
    )
  }

  const loggedIn = () => {
    return (
      <span>
        <LogoutButton />
      </span>
    )
  }

  return (
    <nav className="navbar-container">
      <span>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </span>
      {user ? loggedIn() : noUser()}

    </nav>
  );
}

export default NavBar;

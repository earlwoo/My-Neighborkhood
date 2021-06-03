import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal'
import SignUpFormModal from './auth/SignUpFormModal'
import "./NavBar.css"
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  const noUser = () => {
    return (
      <>
        <span>
          <LoginFormModal />
        </span>
        <span>
          <SignUpFormModal />
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
      <span>
        <NavLink to="/users" exact={true} activeClassName="active">
          Users
        </NavLink>
      </span>
    </nav>
  );
}

export default NavBar;

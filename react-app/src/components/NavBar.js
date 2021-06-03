import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal'
import SignUpFormModal from './auth/SignUpFormModal'

const NavBar = () => {
  return (
    <nav>
      <div>
        <span>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </span>
        <span>
          <LoginFormModal />
        </span>
        <span>
          <SignUpFormModal />
        </span>
        <span>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </span>
        <span>
          <LogoutButton />
        </span>
      </div>
    </nav>
  );
}

export default NavBar;

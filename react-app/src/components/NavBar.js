import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { getUsers } from "../store/users"
import { login } from "../store/session"
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal'
import SignUpFormModal from './auth/SignUpFormModal'
import "./NavBar.css"
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@chakra-ui/react"
import ChatDrawer from "./drawers/ChatDrawer"
import NeighborksDrawer from "./drawers/NeighborksDrawer"
import ProfileModal from './drawers/ProfileModal';
import { FaUserAlt } from "react-icons/fa";

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()

  //restore function redispatches login

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));

    history.push('/main')

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
          <Button rightIcon={FaUserAlt} colorScheme="teal" onClick={onLogin}>Demo User</Button>
        </span>
      </>
    )
  }

  const myPage = () => {
    return <ProfileModal user={user} />

  }

  const loggedIn = () => {
    return (
      <>
        <span>
          <NeighborksDrawer />
        </span>
        <span>
          <ChatDrawer />
        </span>
        <span>
          <LogoutButton />
        </span>
      </>
    )
  }

  return (
    <nav className="navbar-container">
      <span>
        <NavLink to="/" exact={true} activeClassName="active">
          <Button>Home</Button>
        </NavLink>
      </span>
      {user ? loggedIn() : noUser()}

    </nav>
  );
}

export default NavBar;

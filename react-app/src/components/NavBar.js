import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { getUsers } from "../store/users"
import { login } from "../store/session"
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal'
import SignUpFormModal from './auth/SignUpFormModal'
import "./NavBar.css"
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Flex, IconButton } from "@chakra-ui/react"
import ChatDrawer from "./drawers/ChatDrawer"
import NeighborksDrawer from "./drawers/NeighborksDrawer"
import ProfileModal from './drawers/ProfileModal';
import { FaUserAlt } from "react-icons/fa";
import { getChats } from "../store/chats"
import { PhoneIcon, AddIcon, WarningIcon, ChatIcon } from '@chakra-ui/icons'
import { GiDogHouse } from "react-icons/gi";
import { FaUsers } from "react-icons/fa"
import {BsChatFill} from "react-icons/bs"
import { icons } from 'react-icons/lib';

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()

  //restore function redispatches login

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    dispatch(getUsers())
    dispatch(getChats())
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
          <FaUsers />
          <NeighborksDrawer />
        </span>
        <span>
        <BsChatFill />
          <ChatDrawer />
        </span>
        <span>
          <LogoutButton />
        </span>
      </>
    )
  }

  return (
    <Container border="1px" backgroundColor="white" minWidth="100%" minHeight="50">
      <Flex minW="100%" justifyContent="space-evenly">
          <span>

            <NavLink to="/" exact={true} activeClassName="active">
              <GiDogHouse id="house" />
            </NavLink>
          </span>
          {user ? loggedIn() : noUser()}
      </Flex>
    </Container>
  );
}

export default NavBar;

import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { getUsers } from "../store/users"
import { login, logout } from "../store/session"
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
import { PhoneIcon, AddIcon, WarningIcon, ChatIcon, HamburgerIcon, ExternalLinkIcon, RepeatClockIcon, RepeatIcon, EditIcon, CloseIcon } from '@chakra-ui/icons'
import { GiDogHouse } from "react-icons/gi";
import { BsChatFill } from "react-icons/bs"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  ChevronDownIcon
} from "@chakra-ui/react"
import { useState } from 'react';

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [prof, setProf] = useState({})

  //restore function redispatches login

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    dispatch(getUsers())
    dispatch(getChats())
    history.push('/main')

  };

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/")
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
          <Button rightIcon={<FaUserAlt />} colorScheme="teal" onClick={onLogin}>Demo User</Button>
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
        <NeighborksDrawer />
        <ChatDrawer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            _hover={{ bg: "#FBE7C6" }}
            icon={<HamburgerIcon fontSize="35"/>}
            variant="ghost"
            padding="1"
          />
          <MenuList>
            <MenuItem onClick={()=>{setProf(user)}} icon={<EditIcon />}>
              My Profile
            </MenuItem>
            <MenuItem onClick={onLogout} icon={<CloseIcon />}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
            {prof.id && <ProfileModal setProf={setProf} user={user} />}

      </>
    )
  }

  return (
    <Container border="1px" backgroundColor="white" minWidth="100%" minHeight="50">
      <Flex alignItems="center" minW="100%" justifyContent="space-evenly">
        <span>
        <IconButton aria-label="Users"
            icon={<GiDogHouse fontSize="35"/>}
            variant="ghost"
            _hover={{ bg: "#A0E7E5" }}
            padding="1"
            onClick={() => {
              history.push("/main")
            }}
            >
      </IconButton>
        </span>
        {user ? loggedIn() : noUser()}
      </Flex>
    </Container>
  );
}

export default NavBar;

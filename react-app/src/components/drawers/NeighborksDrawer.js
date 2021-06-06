import React, { useRef, useState } from 'react';
import { Button, Input, useDisclosure} from "@chakra-ui/react"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import { useSelector } from 'react-redux';
import MessageModal from "./MessageModal"

const NeighborksDrawer = () => {
  const user = useSelector(state=> state.session.user)
  const users = useSelector(state=>state.users)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const chats = Object.values(user.chats)
  const usersArr = Object.values(users)

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Neighborks
        </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Have a Chat With Your Neighborks</DrawerHeader>

          <DrawerBody>
            {usersArr.map(user => (
              <div>{user.firstname}</div>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
              </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}


export default NeighborksDrawer
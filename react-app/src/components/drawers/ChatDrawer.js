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

const ChatDrawer = () => {
  const user = useSelector(state=> state.session.user)
  const chats = useSelector(state=>state.chats)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()


  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Chats
        </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Have a Chat With Your Neighborks</DrawerHeader>

          <DrawerBody>
            {Object.values(chats).map(chat => (
              <MessageModal chat={chat} user={user} key={chat.id}/>
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


export default ChatDrawer

import React, { useRef, useState } from 'react';
import { Avatar, Button, Divider, useDisclosure, IconButton, Drawer,DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Flex, Box, Portal} from "@chakra-ui/react"
import { useSelector } from 'react-redux';
import MessageModal from "./MessageModal"
import {BsChatFill} from "react-icons/bs"
import "./ChatDrawer.css"

const ChatDrawer = () => {
  const ref = useRef()
  const user = useSelector(state=> state.session.user)
  const chats = useSelector(state=>state.chats)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [show, setShow] = useState(false)
  const btnRef = useRef()


  return (
    <>
      <IconButton aria-label="Users"
            icon={<BsChatFill fontSize="35"/>}
            variant="ghost" onClick={onOpen}
            _hover={{ bg: "#B4F8C8" }}
            padding="1"
            >
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
        useInert={false}
        containerRef={ref}
      >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
          <DrawerHeader backgroundColor="#92ddb6">Chat With Your Neighborks</DrawerHeader>

          <DrawerBody className="chat_drawer">
            <Flex flexDirection="column" alignItems="flex-start">
              {Object.values(chats).map(chat => (
                <Box
                as="button"
                onClick={() => setShow(chat)}
                key={chat.id}
                fontWeight="semibold" letterSpacing="wide"
                fontSize="xs" marginBottom="10px" padding="10px" >
                  <Avatar src={Object.values(chat.users)[1].avatar}></Avatar>
                  <Box fontSize="14" paddingLeft="5" fontWeight="semibold" as="button" >{Object.values(chat.users)[1].name}
                  </ Box>
                  <Divider paddingTop="1" maxWidth="275px"/>
                </Box >

              ))}
                <Portal >
                  {show.id && <MessageModal setShow={setShow} ref={ref} chat={show} user={user} />}
                </Portal>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
              </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}


export default ChatDrawer

import React, { useRef, useState } from 'react';
import { Button, Divider, Flex, Input, useDisclosure} from "@chakra-ui/react"
import {
  Drawer,
  Avatar,
  AvatarGroup,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, Box
} from "@chakra-ui/react"
import { useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';

const NeighborksDrawer = () => {
  const loggedUser = useSelector(state=> state.session.user)
  const users = useSelector(state=>state.users)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const [prof, setProf] = useState({})

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
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader backgroundColor="rgb(0, 208, 111)">Your Neigborkhood</DrawerHeader>

          <DrawerBody>
            {usersArr.map(user => {
              if(user.id !== loggedUser.id) {
                return (
                  <Flex flexDirection="column" alignItems="flex-end" >
                    <Flex paddingBottom="2" paddingTop="2" justifyContent="space-between" alignItems="center" flexDirection="row" as="button" onClick={()=>{setProf(user)}} >
                      <AvatarGroup size="lg" max={2}>
                        <Avatar name={user.firstname} src={user.avatar} />
                        <Avatar name={user.pet.name} src={user.pet.image} />
                      </AvatarGroup>
                      <Box fontWeight="semibold" >{user.firstname} & {user.pet.name}</Box>
                    </Flex>
                    <Divider pas></Divider>
                  </Flex>
                )
              }})}
            {prof.id && <ProfileModal setProf={setProf} user={prof}></ProfileModal>}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
              </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}


export default NeighborksDrawer

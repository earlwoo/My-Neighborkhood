import React, { useRef, useState } from 'react';
import { Button, Divider, Flex, IconButton, useDisclosure, Drawer,
  Avatar,
  AvatarGroup,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, Box} from "@chakra-ui/react"
import { useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
import { FaUsers } from "react-icons/fa"
import "./NeighborksDrawer.css"

const NeighborksDrawer = () => {
  const loggedUser = useSelector(state=> state.session.user)
  const users = useSelector(state=>state.users)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const [prof, setProf] = useState({})

  const usersArr = Object.values(users)

  return (
    <>
      <IconButton aria-label="Users"
            icon={<FaUsers fontSize="35"/>}
            variant="ghost" ref={btnRef} onClick={onOpen}
            _hover={{ bg: "#FFAEBC" }}
            padding="1"
            >

      </IconButton>
      {/* <div class="neighborks__drawer--icon" ref={btnRef} onClick={onOpen}>
        <FaUsers />
      </div> */}
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
          <DrawerHeader backgroundColor="#92ddb6">Your Neigborkhood</DrawerHeader>

          <DrawerBody>
            {usersArr.map(user => {
              if(user.id !== loggedUser.id) {
                return (
                  <Flex key={user.id} flexDirection="column" alignItems="flex-end" >
                    <Flex paddingBottom="2" paddingTop="2" justifyContent="space-between" alignItems="center" flexDirection="row" as="button" onClick={()=>{setProf(user)}} >
                      <AvatarGroup size="lg" max={2}>
                        <Avatar name={user.firstname} src={user.avatar} />
                        <Avatar name={user.pet.name} src={user.pet.image} />
                      </AvatarGroup>
                      <Box fontWeight="semibold" >{user.firstname} & {user.pet.name}</Box>
                    </Flex>
                    <Divider ></Divider>
                  </Flex>
                )
              }
              return null;
            })}
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

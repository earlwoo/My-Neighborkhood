import React, { useRef, useState } from 'react';
import {
    Modal,
    Box,
    Button,
    Lorem,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Avatar
} from "@chakra-ui/react"
import { useSelector } from 'react-redux';

const ProfileModal = ({ user }) => {
    const loggedUser = useSelector(state=>state.session.user)
    const [myProf, setmyProf] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const users = useSelector(state => state.users)

    const pet = user.pet

    // if (user.id === loggedUser.id) {setmyProf(true)}

    return (
        <>
            <Button onClick={onOpen}>{user.firstname}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{myProf ? "My Profile" : "My Neighbork"}My Neighbork</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            <Avatar name={user.firstname} src={user.avatar} ></Avatar>
                            <Avatar name={user.firstname} src={pet.image} ></Avatar>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
            </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal

import React, { useRef, useState } from 'react';
import {
    Modal,
    Button,
    Lorem,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react"
import { useSelector } from 'react-redux';

const ProfileModal = ({ user }) => {
    const loggedUser = useSelector(state=>state.session.user)
    const [myProf, setmyProf] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    // single profile for neighbors or user, if user prop === logged user, it is our profile so we should be able to edit our info.
    // const users = useSelector(state => state.users)

    return (
        <>
            <Button onClick={onOpen}>{user.firstname}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{myProf ? "My Profile" : "My Neighbork"}My Neighbork</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>message</p>
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

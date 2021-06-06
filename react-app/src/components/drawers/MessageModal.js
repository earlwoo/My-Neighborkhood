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

const MessageModal = ({ user, chat }) => {
    const currUser = useSelector(state => state.session.user)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const messages = Object.values(chat.messages)
    return (
        <>
            <Button onClick={onOpen}>{chat.name}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {messages.map(message => (
                            <p>{message.body}</p>
                        ))}
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

export default MessageModal

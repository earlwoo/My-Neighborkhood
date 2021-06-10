import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    Box,
    Button,
    Image,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Divider,
    Avatar,
    Text,
    Flex
} from "@chakra-ui/react"
import { useSelector } from 'react-redux';
import "./Profile.css"
import { AiFillEdit as EditIcon } from "react-icons/ai";

const ProfileModal = ({ setProf, user }) => {
    const loggedUser = useSelector(state => state.session.user)
    const [myProf, setmyProf] = useState(false)
    const [editMe, setEditMe] = useState(false)
    const [editPet, setEditPet] = useState(false)
    const [bioText, setBioText] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const users = useSelector(state => state.users)

    const pet = user.pet

    useEffect(() => {
        onOpen()
        if (user.id === loggedUser.id) { setmyProf(true) }
    }, [user])

    const messageToEdit = () => {

    }

    const profEdit = () => {

        return (
            <div id="edit__icon" onClick={() => (setEditMe(true))} className={`${message?.id} edit__icon`} ><EditIcon />edit</div>

        )
    }


    return (
        <>
            {/* <Button onClick={onOpen}>{user.firstname}</Button> */}

            <Modal maxH="500px" size="lg" isOpen={isOpen} onClose={() => {
                onClose()
                setProf({})
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader backgroundColor="#92ddb6" >{myProf ? "My Profile" : `My Neighbork ${user.firstname}`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDirection="column" alignItems="center">
                        <div className="profile__avatars-container">
                            <Flex alignItems="center" minW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <div className="profile__avatars-individual userpic" >
                                    <Avatar size="2xl" name={user.firstname} src={user.avatar} />
                                </div>
                                <div className="profile__bio-container" >
                                    <ModalHeader textAlign="center" fontSize="20" fontWeight="bolder"  minHeight="100%" minWidth="100%" borderRadius="lg" >{user.firstname} {user.lastname}</ModalHeader>
                                    <Divider />
                                    <Text fontSize="14" color="#92ddb6" as="u" fontWeight="semibold" >Email</Text>
                                    <Text fontSize="12" fontWeight="bold">{user.email}</Text>
                                    <Divider />
                                    <Text fontSize="14" color="#92ddb6" as="u" fontWeight="semibold" >About</Text>
                                    <Text textAlign="center" maxInlineSize="255"  fontWeight="semibold">{user.bio}</Text>
                                    {/* make edit input for user */}
                                </div>
                            </Flex>
                        </div>
                        <Divider />
                        <div className="profile__avatars-container">
                            <Flex alignItems="center" maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <div className="profile__bio-container" >
                                    <ModalHeader textAlign="center" fontSize="20" fontWeight="bolder"  minHeight="100%" minWidth="100%" borderRadius="lg" >{pet.name}</ModalHeader>
                                    <Divider />
                                    <Text fontSize="14" color="#92ddb6" as="u" fontWeight="semibold" >Age</Text>
                                    <Text fontWeight="bold" >{pet.age}</Text>
                                    <Divider />
                                    <Text fontSize="14" color="#92ddb6" as="u" fontWeight="semibold" >About  </Text>
                                    <Text textAlign="center" fontWeight="semibold" >{pet.bio}</Text>
                                    {/* make edit input for user */}

                                </div>
                                <div className="profile__avatars-individual petpic" >
                                    <Avatar size="2xl" name={pet.name} src={pet.image} />
                                </div>

                            </Flex>
                        </div>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="outline" mr={3} onClick={onClose} >Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal

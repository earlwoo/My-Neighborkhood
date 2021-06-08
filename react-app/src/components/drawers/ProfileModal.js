import React, { useRef, useState } from 'react';
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
    Avatar
} from "@chakra-ui/react"
import { useSelector } from 'react-redux';
import "./Profile.css"

const ProfileModal = ({ user }) => {
    const loggedUser = useSelector(state => state.session.user)
    const [myProf, setmyProf] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const users = useSelector(state => state.users)

    const pet = user.pet

    if (user.id === loggedUser.id) { setmyProf(true) }

    return (
        <>
            <Button onClick={onOpen}>{user.firstname}</Button>

            <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader backgroundColor={"rgb(0, 208, 111)"} >{myProf ? "My Profile" : `My Neighbork ${user.firstname}`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="profile__avatars-container">
                            <div className="profile__avatars-individual" >
                                {/* <Avatar size="2xl" name={user.firstname} src={user.avatar} ></Avatar> */}
                                <Box boxSize="200px">
                                    {/* <Image src={user.avatar} alt="User Photo" /> */}
                                    <Avatar size="2xl" name={user.firstname} src={user.avatar} />
                                    {myProf && <div>mine</div>}
                                </Box>
                            </div>
                            <div className="profile__bio-container" >
                                <div>Name: {user.firstname} {user.lastname}</div>
                                <Divider />
                                <div>Email: {user.email}</div>
                                <Divider />
                                <div>Bio:
                                    <span className="bio-span">{user.bio}</span>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className="profile__avatars-container">
                            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">

                            </Box>
                            <div className="profile__bio-container" >
                                <div>Name: {pet.name}</div>
                                <Divider />
                                <div>Age: {pet.age}</div>
                                <Divider />
                                <div>Bio:
                                    <span className="bio-span">{pet.bio}</span>
                                </div>
                            </div>
                            <div className="profile__avatars-individual" >
                                {/* <Avatar size="2xl" name={pet.name} src={pet.image} ></Avatar> */}
                                <Box boxSize="200px">
                                    {/* <Image src={pet.image} alt="Pet Photo" /> */}
                                    <Avatar size="2xl" name={pet.name} src={pet.image} />
                                </Box>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose} >Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal

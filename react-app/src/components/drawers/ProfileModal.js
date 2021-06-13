import React, { useEffect, useState } from 'react';
import {
    Modal,

    Button,
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
    Flex,
    Textarea
} from "@chakra-ui/react"
import { useSelector, useDispatch } from 'react-redux';
import "./Profile.css"
import { AiFillEdit as EditIcon, AiOutlineEnter as SaveIcon } from "react-icons/ai";
import { TiCancel as CancelIcon } from "react-icons/ti";
import { editMyBio, editMyPet } from '../../store/session';

const ProfileModal = ({ setProf, user }) => {
    const loggedUser = useSelector(state => state.session.user)
    const [myProf, setmyProf] = useState(false)
    const [editMe, setEditMe] = useState(false)
    const [editPet, setEditPet] = useState(false)
    const [bioText, setBioText] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    // const users = useSelector(state => state.users)

    const pet = user.pet

    useEffect(() => {
        onOpen()
        if (user.id === loggedUser.id) { setmyProf(true) }
    }, [user, loggedUser.id, onOpen])

    const userEdit = () => {
        return (
            editMe ?
            <Flex>
                 <div id="save__icon" onClick={sendMyEdit}><SaveIcon />Save</div>
                 <div id="cancel__icon" onClick={() => {
                     setBioText('')
                     setEditMe(false)
                 }}><CancelIcon />Cancel</div>
             </Flex>
                 :
             <>
                 <div id="edit__icon" onClick={() => {
                     setBioText(user.bio)
                     setEditMe(true)
                     setEditPet(false)
                }} ><EditIcon /></div>
             </>
        )
    }

    const petEdit = () => {
        return(
           editPet ?
           <Flex>
                <div id="save__icon" onClick={sendMyPetEdit}><SaveIcon />Save</div>
                <div id="cancel__icon" onClick={() => {
                    setBioText('')
                    setEditPet(false)
                }}><CancelIcon />Cancel</div>
            </Flex>
                :
            <>
                <div id="edit__icon" onClick={() => {
                    setBioText(pet.bio)
                    setEditPet(true)
                    setEditMe(false)
                }} ><EditIcon /></div>
            </>
        )
    }

    const sendMyEdit = (e) => {
        e.preventDefault()
        dispatch(editMyBio(bioText, loggedUser.id))
        setEditMe(false)
    }

    const sendMyPetEdit = (e) => {

        dispatch(editMyPet(bioText, loggedUser.id))
        setEditPet(false)
    }

    const editInputText = () => {

        if(editMe) {
            return (
                <Textarea fontWeight="semibold"
                focusBorderColor="transparent"
                name="myedit"
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                />
            )
        }
        if(editPet) {
            return (
                <Textarea fontWeight="semibold"
                focusBorderColor="transparent"
                name="mypetedit"
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                />
            )
        }
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
                                    <Avatar size="2xl" name={`${user.firstname} ${user.lastname}`} src={user.avatar} />
                                </div>
                                <div className="profile__bio-container" >
                                    <ModalHeader textAlign="center" fontSize="20" fontWeight="bolder"  minHeight="100%" minWidth="100%" borderRadius="lg" >{user.firstname} {user.lastname}</ModalHeader>
                                    <Divider />
                                    <Text fontSize="14" color="#92ddb6" as="u" fontWeight="semibold" >Email</Text>
                                    <Text fontSize="12" fontWeight="bold">{user.email}</Text>
                                    <Divider />
                                    <Text fontSize="14" color="#92ddb6" as="u" fontWeight="semibold" >About</Text>
                                    {editMe ? editInputText() : <Text textAlign="center" maxInlineSize="255"  fontWeight="semibold">{user.bio}</Text>}

                                    {/* make edit input for user */}
                                    {myProf && userEdit()}
                                </div>
                            </Flex>
                        </div>
                        <Divider />
                        <div className="profile__avatars-container">
                            <Flex alignItems="center" maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <div className="profile__bio-container" >
                                    {pet?.id && <ModalHeader textAlign="center" fontSize="20" fontWeight="bolder"  minHeight="100%" minWidth="100%" borderRadius="lg" >{pet?.name}</ModalHeader>}
                                    <Divider />
                                    <Text fontSize="14" color="#92ddb6" as="u" fontWeight="semibold" >Age</Text>
                                    <Text fontWeight="bold" >{pet?.age}</Text>
                                    <Divider />
                                    <Flex flexDirection="row">
                                        <Text fontSize="14" color="#92ddb6" as="u" fontWeight="semibold" >About
                                        </Text>
                                    </Flex>
                                    {editPet ? editInputText() : <Text textAlign="center" maxInlineSize="255" fontWeight="semibold" >{pet?.bio}</Text>}
                                    {/* make edit input for user */}
                                    {myProf && petEdit()}

                                </div>
                                <div className="profile__avatars-individual petpic" >
                                    <Avatar size="2xl" name={pet?.name} src={pet?.image} />
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

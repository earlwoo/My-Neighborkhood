import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Box, Avatar, AvatarGroup, Divider, Portal, Flex, Text } from "@chakra-ui/react"
import { ChatIcon } from "@chakra-ui/icons"
import MessageModal from '../drawers/MessageModal';
import { createChat } from '../../store/chats'



const MapsUserInfo = ({ selected }) => {
    const curruser = useSelector(state => state.session.user)
    const chatStore = useSelector(state => state.chats)
    const ref = useRef()
    const [show, setShow] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
    
    }, [selected])

    let findChat = Object.values(chatStore).find(chat => {
        return ((chat.id !== 1) && (curruser.id in chat.users) && (selected.id in chat.users))
    })

    // set current chat to state

    const handleCreate = async (e) => {
        e.preventDefault()
        const chatData = {
            name: `${selected.firstname} ${selected.lastname}-${selected.id}`,
            selected_id: selected.id
        }
        let newChat = await dispatch(createChat(chatData))
        setShow(newChat)

        return (
            <MessageModal setShow={setShow} user={curruser} chat={newChat} />
        )
    }



    return (
        <div>
            <Box padding="3" minH="150" maxW="lg" borderWidth="1px" borderColor="rgb(0, 208, 111)" borderRadius="lg" overflow="hidden" >
                <Flex flexDirection="column" alignItems="center">
                    <AvatarGroup>
                        <Avatar size="lg" name={selected.firstname} src={selected.avatar} />
                        <Avatar size="lg" name={selected.pet.name} src={selected.pet.image} />
                    </AvatarGroup>
                    <Text fontSize="15" fontWeight="semibold">{selected.firstname} & {selected.pet.name}</Text>
                </Flex>
                <Divider />
                <Flex flexDirection="column" alignItems="center" paddingTop="2">
                    <Text fontSize="12" fontWeight="bold">{selected.address.street}</Text>
                    <Text fontSize="12" fontWeight="bold">{selected.address.city}, {selected.address.state}. {selected.address.zip}</Text>
                </Flex>
                {findChat ?
                <Flex paddingTop="2" justifyContent="flex-end">
                    <Box variant="outline" as="button"     onClick={() => setShow(findChat)} fontWeight="semibold"
                    letterSpacing="wide"
                    backgroundColor="#92ddb6"
                    padding="1"
                    borderRadius="4"
                    textAlign="right"
                    >
                        <ChatIcon />
                            Chat
                    </Box >
                </Flex>
                        : <Flex paddingTop="2" justifyContent="flex-end">
                            <Box variant="outline" as="button" onClick={handleCreate} fontWeight="semibold"
                            letterSpacing="wide"
                            backgroundColor="#92ddb6"
                            padding="1"
                            borderRadius="4"
                            textAlign="right"
                            >
                            <ChatIcon />
                            Start Chat
                            </Box>
                        </Flex>
                        }
            {show.users && (
                <Portal>
                    <MessageModal ref={ref} setShow={setShow} chat={show} user={curruser} />
                </Portal>
            )
            }
            </Box>
        </div >
    )
}


export default MapsUserInfo

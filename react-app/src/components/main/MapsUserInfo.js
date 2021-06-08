import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Box, Avatar, AvatarGroup, Divider, Button } from "@chakra-ui/react"
import MessageModal from '../drawers/MessageModal';
import { createChat, getChats } from '../../store/chats'



const MapsUserInfo = ({ selected }) => {
    const curruser = useSelector(state => state.session.user)
    const chatStore = useSelector(state => state.chats)
    const [dummy, setDummy] = useState(false)
    const dispatch = useDispatch()
    // const [ourChat, setOurChat] = useState()

    useEffect(()=>{

    },[dispatch, chatStore])

    let ourChat = Object.values(chatStore).find(chat => {
                        return ((chat.id !== 1) && (curruser.id in chat.users) && (selected.id in chat.users))})
        // set current chat to state

    console.log("~~~~~ ourchat", ourChat)


    const handleCreate = async (e) => {
        e.preventDefault()
        const chatData = {
            name: `${selected.firstname} ${selected.lastname}-${selected.id}`,
            selected_id: selected.id
        }
        let newChat = await dispatch(createChat(chatData))
        setDummy(!dummy)// push chat
        return (
            <MessageModal user={curruser} chat={newChat} />
        )
    }

    return (
        <div>
            <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <div>
                    <AvatarGroup>
                        <Avatar size="md" name={selected.firstname} src={selected.avatar} />
                    </AvatarGroup>
                    <span>{selected.firstname} {selected.lastname}</span>

                </div>
                <Divider />
                <div>
                    <span>{selected.address.street}</span>
                    <span>{selected.address.city}</span>
                    <span>{selected.address.state}</span>
                    <span>{selected.address.zip}</span>
                </div>
                {ourChat ? <MessageModal user={curruser} chat={ourChat} /> : <Button onClick={handleCreate} >Start Chat</Button>}
            </Box>
        </div>
    )
}


export default MapsUserInfo



{/* <Avatar size="md" name={selected.firstname} src={selected.avatar} /> */ }

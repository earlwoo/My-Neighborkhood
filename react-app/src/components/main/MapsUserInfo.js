import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Box, Avatar, AvatarGroup, Divider, Button } from "@chakra-ui/react"
import MessageModal from '../drawers/MessageModal';


const MapsUserInfo = ({ selected }) => {
    const curruser = useSelector(state => state.session.user)
    const chat = Object.values(selected.chats).find(chat => {
        return curruser.id in chat.users
    })

    console.log("!!!!!!!!!!", chat)
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
                {chat ? <MessageModal user={curruser} chat={chat} /> : <Button >Send Message</Button>}
            </Box>
        </div>
    )
}


export default MapsUserInfo



{/* <Avatar size="md" name={selected.firstname} src={selected.avatar} /> */ }

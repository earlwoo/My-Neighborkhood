import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { Box, Avatar, AvatarGroup, Divider } from "@chakra-ui/react"


const MapsUserInfo = ({ selected }) => {
    const curruser = useSelector(state => state.session.user)
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
            </Box>
        </div>
    )
}


export default MapsUserInfo

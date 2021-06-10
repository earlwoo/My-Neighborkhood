import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getChats } from "../../store/chats"
import {getUsers} from "../../store/users"
import MapContainer from "./MapsContainer"
import { Flex, Image } from "@chakra-ui/react"
import dog1 from "./pugSides.png"
import "./Main.css"




const Main = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getChats())
    }, [dispatch])

        if (users) {
            return (
        <Flex className="map_container">
            <Image maxWidth="425px" src={dog1}></Image>
            <MapContainer />
            <Image maxWidth="425px" src={dog1}></Image>
        </Flex>)
        }
        else {
            return (<div>hello test</div>)
        }


}


export default Main

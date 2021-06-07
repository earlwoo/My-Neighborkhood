import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getChats } from "../../store/chats"
import {getUsers} from "../../store/users"
import MapContainer from "./MapsContainer"



const Main = () => {
    const loggedUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getChats())
    }, [dispatch])

    return (
        <div className="map_container">
            <MapContainer />
        </div>
    )
}


export default Main

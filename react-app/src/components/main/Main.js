import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getChats } from "../../store/chats"
import {getUsers} from "../../store/users"
import MapContainer from "./MapsContainer"



const Main = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getChats())
    }, [dispatch])
    // dispatch(getChats())

        if (users) {
            return (<div className="map_container">
            <MapContainer />
        </div>)
        }
        else {
            return (<div>hello test</div>)
        }


}


export default Main

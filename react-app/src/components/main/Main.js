import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import MapContainer from "./GoogleMaps"


const Main = () => {
    const loggedUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()


    return (
        <div>
            <MapContainer />
        </div>
    )
}


export default Main

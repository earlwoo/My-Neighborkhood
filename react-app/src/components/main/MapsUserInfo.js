import React, {useState} from 'react'
import { useSelector } from 'react-redux';

const MapsUserInfo = ({ selected }) => {
    const curruser = useSelector(state => state.session.user)
    return (
        <div>
            {selected.firstname}
        </div>
    )
}


export default MapsUserInfo

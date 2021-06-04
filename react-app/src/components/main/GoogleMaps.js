import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from "../../store/users"


const mapStyles = {
    height: "100vh",
    width: "100%"
};

const MapContainer = () => {
    const GOOGLE_API = process.env.REACT_APP_GOOGLE_API
    const curruser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const [selected, setSelected] = useState({});

    const onSelect = item => {
        setSelected(item);
    }

    console.log(Object.values(users)[0])

    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_API}>
            {(curruser.location && Object.values(users).length) && <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={14}
                center={curruser.location}
            >
                {Object.values(users).map((user) => <Marker key={user.id} position={user.location} onClick={() => onSelect(user)} />
                )}
            </GoogleMap>}
        </LoadScript>
    )
}
export default MapContainer;


//"AIzaSyDfXTCxhrrOPyjT3OFCn-EQ0RMQpGyep8c"


// const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
//   })

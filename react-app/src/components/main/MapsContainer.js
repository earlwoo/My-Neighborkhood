import React, { useRef, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { useSelector } from 'react-redux';
import MapsUserInfo from './MapsUserInfo'
import dog from "./dog.png"
import { Portal } from '@chakra-ui/portal';


const mapStyles = {
    height: "75vh",
    width: "90%"
};

const MapContainer = () => {
    const curruser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    // const chats = useSelector(state => state.chats)
    const [selected, setSelected] = useState({});
    // const ref = useRef()

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API // ,
        // ...otherOptions
    })

    const renderMap = () => {
        
        return (
            <>
                {(curruser.location && Object.values(users).length) && <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={16}
                    center={curruser.location}
                >
                    {Object.values(users)?.map((user) => {
                        if (curruser.id !== user.id) {
                            return <Marker icon={dog} key={user.id} position={user.location} onClick={() => setSelected(user)} />
                        }
                    })}
                    {selected.location && (
                        <InfoWindow
                            position={selected.location}
                            // clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <MapsUserInfo selected={selected} />

                        </InfoWindow>
                    )

                    }
                </GoogleMap>}
            </>
        )
    }

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? renderMap() : <div>Map cannot be loaded right now, sorry.</div>;
}


export default MapContainer;

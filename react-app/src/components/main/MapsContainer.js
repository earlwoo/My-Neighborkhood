import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { useSelector } from 'react-redux';
import MapsUserInfo from './MapsUserInfo'
import dog from "./dog.png"


const mapStyles = {
    height: "88.5vh",
    width: "100%"
};

const MapContainer = () => {
    const curruser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const [selected, setSelected] = useState({});


    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API // ,

    })

    const renderMap = () => {

        return (
            <>
                {(curruser.location && Object.values(users).length) && <GoogleMap
                    position="static"
                    zIndex="1"
                    mapContainerStyle={mapStyles}
                    zoom={16}
                    center={curruser.location}
                >
                    {Object.values(users)?.map((user) => {
                        if (curruser.id !== user.id) {
                            return <Marker icon={dog} key={user.id} position={user.location} onClick={() => setSelected(user)} />
                        }

                        return null;
                    })}
                    {selected.location && (
                        <InfoWindow
                            position={selected.location}
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

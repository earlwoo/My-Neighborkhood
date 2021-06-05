import React, {useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { useSelector } from 'react-redux';
import MapsUserInfo from './MapsUserInfo'

// const options = {
//     zoomControlOptions: {
//         position: google.maps.ControlPosition.RIGHT_CENTER // 'right-center' ,
//         // ...otherOptions
//     }
// }

const mapStyles = {
    height: "75vh",
    width: "75%"
};

const MapContainer = () => {
    const curruser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const [selected, setSelected] = useState({});

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API // ,
        // ...otherOptions
    })

    const onSelect = item => {
        setSelected(item);
    }

    const renderMap = () => {

        return (
            <>
                {(curruser.location && Object.values(users).length) && <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={16}
                    center={curruser.location}
                >
                    {Object.values(users).map((user) => (
                        <Marker key={user.id} position={user.location} onClick={() => onSelect(user)} />
                    ))}
                    {selected.location && (
                        <InfoWindow
                        position={selected.location}
                        clickable={true}
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

    return isLoaded ? renderMap() : null;
}


export default MapContainer;

import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import './GoogleMapStyle.css';
import {useMemo} from "react";

function GoogleMaps() {
    const center = useMemo(() => ({lat: 44.529523, lng: 25.977408}), []);
    const {isLoaded} = useLoadScript(
        {
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        }
    )
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <GoogleMap zoom={16} center={center} mapContainerClassName="map-container">
            <Marker position={center}/>
        </GoogleMap>
    );
}

export default GoogleMaps;

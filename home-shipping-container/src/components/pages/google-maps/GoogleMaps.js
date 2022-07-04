import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import './GoogleMapStyle.css';
import React, {useMemo} from "react";
import {Spinner} from "@chakra-ui/react";
import NavBar from "../../navBar/NavBar";
import Footer from "../../footer/Footer";

function GoogleMaps() {
    const center = useMemo(() => ({lat: 44.529523, lng: 25.977408}), []);
    const {isLoaded} = useLoadScript(
        {
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        }
    )
    if (!isLoaded) {
        return (
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        );
    }

    return (
        <>
            <NavBar/>
            <GoogleMap zoom={15}
                       center={center}
                       mapContainerClassName="map-container">
                <Marker position={center}/>
            </GoogleMap>
            <Footer/>
        </>
    );
}

export default GoogleMaps;

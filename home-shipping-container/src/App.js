import NavBar from "./components/navBar/NavBar";
import GlobalStyle from "./components/global-style/GlobalStyles";
import ImagineSlider from "./components/image-carousel/ImageCarousel";
import {useEffect, useState} from "react";
import DropDownMenu from "./components/drop-down-menu/DropDownMenu";
import InfoSectionIndex from "./components/info-section/InfoSectionIndex";
import Footer from "./components/footer/Footer";
import axios from "axios";
// import SupportAdmin from "./components/live-support-chat/support-admin/SupportAdmin";
import SupportEngine from "./components/live-support-chat/support-engine/SupportEngine";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [detailsCarousel, setDetailsCarousel] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/container")
            .then(data => setDetailsCarousel(data.data))
            .catch(error => {
                console.log(error);
            })
    }, []);

    function toggle() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <GlobalStyle/>
            <NavBar toggle={toggle}/>
            <DropDownMenu isOpen={isOpen} toggle={toggle}/>
            <ImagineSlider slides={detailsCarousel}/>
            <InfoSectionIndex/>
            <Footer/>
            <SupportEngine/>
        </>
    );
}

export default App;

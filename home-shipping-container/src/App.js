import NavBar from "./components/navBar/NavBar";
import GlobalStyle from "./components/global-style/GlobalStyles";
import ImagineSlider from "./components/image-carousel/ImageCarousel";
import {useEffect, useState} from "react";
import DropDownMenu from "./components/drop-down-menu/DropDownMenu";
import InfoSectionIndex from "./components/info-section/InfoSectionIndex";
import Footer from "./components/footer/Footer";
import axios from "axios";
import "@stripe/stripe-js";
function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [detailsCarousel, setDetailsCarousel] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API_CONTAINERS)
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
            {/*<SupportEngine/>*/}
        </>
    );
}

export default App;

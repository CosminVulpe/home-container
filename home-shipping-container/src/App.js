import NavBar from "./components/navBar/NavBar";
import GlobalStyle from "./components/global-style/GlobalStyles";
import ImagineSlider from "./components/image-carousel/ImageCarousel";
import {SliderImageData} from "./components/data/SliderImageData";
import {useState} from "react";
import DropDownMenu from "./components/drop-down-menu/DropDownMenu";
import InfoSectionIndex from "./components/info-section/InfoSectionIndex";
import {InfoData} from "./components/data/InfoSectionIndexData";
import Footer from "./components/footer/Footer";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <GlobalStyle/>
            <NavBar toggle={toggle}/>
            <DropDownMenu isOpen={isOpen} toggle={toggle}/>
            <ImagineSlider slides={SliderImageData}/>
            <InfoSectionIndex {...InfoData}/>
            <Footer/>
        </>
    );
}

export default App;

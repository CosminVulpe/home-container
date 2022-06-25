import NavBar from "./components/navBar/NavBar";
import GlobalStyle from "./components/global-style/GlobalStyles";
import ImagineSlider from "./components/image-carousel/ImageCarousel";
import {useEffect, useState} from "react";
import DropDownMenu from "./components/drop-down-menu/DropDownMenu";
import InfoSectionIndex from "./components/info-section/InfoSectionIndex";
import Footer from "./components/footer/Footer";
import axios from "axios";
import "@stripe/stripe-js";
import {useAtom} from "jotai";
import {RESERVATION_ID, USER_INFO} from "./components/jotai-atom/useAtom";
import {fetchUserData} from "./components/pages/api/AuthenticationService";
function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [detailsCarousel, setDetailsCarousel] = useState([]);
    const [userInfo, setUserInfo] = useAtom(USER_INFO);


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API_CONTAINERS)
            .then(data => setDetailsCarousel(data.data))
            .catch(error => {
                console.log(error);
            });

        fetchUserData()
            .then((response) => {
                if (response.status === 200) {
                    setUserInfo(response.data)
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 500 ) {
                    setUserInfo(null);
                }
            });
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

import NavBar from "./components/navBar/NavBar";
import GlobalStyle from "./components/global-style/GlobalStyles";
import ImagineSlider from "./components/image-carousel/ImageCarousel";
import {useEffect, useState} from "react";
import DropDownMenu from "./components/drop-down-menu/DropDownMenu";
import InfoSectionIndex from "./components/info-section/InfoSectionIndex";
import Footer from "./components/footer/Footer";
import "@stripe/stripe-js";
import {useAtom} from "jotai";
import {USER_INFO} from "./components/jotai-atom/useAtom";
import {fetchUserData} from "./components/service/authentication-service/AuthenticationService";
import {ApiGetContainer} from "./components/service/api-requests/ApiService";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [detailsCarousel, setDetailsCarousel] = useState([]);
    const [userInfo, setUserInfo] = useAtom(USER_INFO);

    useEffect(() => {
        ApiGetContainer("")
            .then(data => setDetailsCarousel(data.data))
            .catch(error => console.log(error));

        fetchUserData("/user/info")
            .then((response) => {
                if (response.status === 200) {
                    if (response.data === "") {
                        setUserInfo(null);
                    } else {
                        setUserInfo(response.data);
                    }
                }
            })
            .catch((error) => console.log(error));
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
        </>
    );
}

export default App;

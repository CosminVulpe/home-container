import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ContainerSection from "./components/pages/container/Container";
import 'bootstrap/dist/css/bootstrap.css';
import Checkout from "./components/pages/checkout-page/Checkout";
import Containers from "./components/pages/all-containers/Containers";
import {ChakraProvider} from "@chakra-ui/react";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import GoogleMaps from "./components/pages/google-maps/GoogleMaps";
import Contact from "./components/pages/contact-us/Contact";

const path = window.location.pathname;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <ChakraProvider>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/container/:id" element={<ContainerSection/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/all-containers" element={<Containers/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/location" element={<GoogleMaps/>}/>
                    <Route path="/contact-us" element={<Contact/>}/>
                </Routes>
            </ChakraProvider>
        </Router>
    </React.StrictMode>
);

reportWebVitals();


// {/*{path.indexOf('/support') === -1 ? <App/> : <SupportAdmin/>}*/}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SupportAdmin from "./components/live-support-chat/support-admin/SupportAdmin";
import ContainerSection from "./components/pages/container/Container";
import 'bootstrap/dist/css/bootstrap.css';
import Checkout from "./components/pages/checkout-page/Checkout";

const path = window.location.pathname;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/container/:id" element={<ContainerSection/>}/>
                <Route path="/checkout" element={<Checkout/>}/>

            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();


// {/*{path.indexOf('/support') === -1 ? <App/> : <SupportAdmin/>}*/}

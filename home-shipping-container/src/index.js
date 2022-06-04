import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SupportAdmin from "./components/live-support-chat/support-admin/SupportAdmin";
import ContainerSection from "./components/pages/container/Container";
import 'bootstrap/dist/css/bootstrap.css';

const path = window.location.pathname;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            {/*{path.indexOf('/support') === -1 ? <App/> : <SupportAdmin/>}*/}
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/container" element={<ContainerSection/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();

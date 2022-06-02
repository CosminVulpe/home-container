import React, {useEffect, useState} from "react";
import styled, {css} from "styled-components/macro";
import {Link} from 'react-router-dom';
import {Button} from "../button/Button";
import Bars from '../images/bars.svg';
import axios from "axios";

const Nav = styled.nav`
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    position: fixed;
    z-index: 100;
    width: 100%;
    background: #CE8952;
    opacity: 1;
`;

const NavLink = css`
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    text-decoration: none;
    font-size: 18px;
`;

const Logo = styled(Link)`
    ${NavLink}
    font-style: italic;
`;

const MenuBars = styled.i`
    display:none;

    @media screen and (max-width: 768px){
        display: block;
        background-image: url(${Bars});
        background-size: contain;
        height: 40px;
        width: 40px;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-50%, 25%);
    }
`;


const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -48px;
    
    @media screen and (max-width: 768px){
        display: none;
    }
`;

const NavMenuLinks = styled(Link)`
    ${NavLink}
`;

const NavBtn = styled.div`
    display: flex;
    align-items: center;
    margin-right: 24px;
    @media screen and (max-width: 768px){
        display: none;
    }
`;

function NavBar({toggle}) {
    const [navBarData, setNavBarData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/navBarData")
            .then(data => setNavBarData(data.data))
            .catch(error => {
                console.log(error);
            })
    }, []);
    return (
        <Nav>
            <Logo to="/">House Container</Logo>
            <MenuBars onClick={toggle}/>
            <NavMenu>
                {navBarData.map((item, index) =>
                    <NavMenuLinks to={item.link} key={index}>
                        {item.title}
                    </NavMenuLinks>
                )}
            </NavMenu>
            <NavBtn>
                <Button to="/register" primary={'true'}>Register</Button>
                <Button to="/login" primary={'true'}>Login</Button>
                <Button to="/contact" primary={'true'}>Contact Us</Button>
            </NavBtn>
        </Nav>
    );
}

export default NavBar;
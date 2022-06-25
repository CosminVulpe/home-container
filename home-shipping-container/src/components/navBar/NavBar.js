import React from "react";
import styled, {css} from "styled-components/macro";
import {Link} from 'react-router-dom';
import {Button} from "../button/Button";
import Bars from '../images/bars.svg';
import ImgLogo2 from './../images/logo/white-logo-home-container.png';
import {getToken, logOut} from "../pages/authentication-service/AuthenticationService";


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

  &:hover {
    transform: translateY(-2px);
  }

  &:visited {
    color: white;
  }

  &:link {
    color: white;
  }

`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;


const MenuBars = styled.i`
  display: none;

  @media screen and (max-width: 768px) {
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
  margin-right: 185px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavMenuLinks = styled(Link)`
  ${NavLink};
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;



function NavBar({toggle}) {

    return (
        <Nav>
            <Logo to="/">
                <img src={ImgLogo2} alt="business-shipping-container-logo" style={{
                    width: "16.5rem"
                }}/>
            </Logo>
            <MenuBars onClick={toggle}/>
            <NavMenu>
                <NavMenuLinks to="/about">About </NavMenuLinks>
                <NavMenuLinks to="/all-containers">Containers </NavMenuLinks>
                <NavMenuLinks to="/location">Location </NavMenuLinks>
            </NavMenu>
            <NavBtn>
                {getToken() == null ?
                    <Button to="/register" primary='true'>Login</Button> :
                    <Button to="#" primary='true' onClick={logOut}>Logout</Button>
                }
                <Button to="/contact-us" primary='true'>Contact Us</Button>
            </NavBtn>
        </Nav>
    );
}

export default NavBar;
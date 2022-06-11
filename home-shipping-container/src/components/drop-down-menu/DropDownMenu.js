import styled from 'styled-components/macro';
import {Button} from "../button/Button";
import {Link} from 'react-router-dom';
import {FaTimes} from 'react-icons/fa';


const DropDownContainer = styled.div`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #cd853f;
    display: grid;
    align-items: center;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
    top: ${({isOpen}) => (isOpen ? '0' : '-100%')};
`;

const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

const CloseIcon = styled(FaTimes)`
    color: #000d1a;
`;

const DropDownWrapper = styled.div``;


const DropDownMenuList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 80px);
    text-align: center;
    margin-bottom: 4rem;
    
    @media screen and (max-width: 480px){
        grid-template-rows: repeat(4,60px);
    }
`;


const DropDownLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    
    &:hover{
        color: #000d1a;
    }
`;
const BtnWrapper = styled.div`
    display: flex;
    justify-content: center;
`;


function DropDownMenu({isOpen, toggle}) {

    return (
        <DropDownContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <DropDownWrapper>
                <DropDownMenuList>
                    <DropDownLink to="/about">About 📰</DropDownLink>
                    <DropDownLink to="/container">Containers 🏠</DropDownLink>
                    <DropDownLink to="/gallery">Gallery 📸</DropDownLink>
                    <DropDownLink to="/location">Location 📍</DropDownLink>
                </DropDownMenuList>
                <BtnWrapper>
                    <Button primary="true" round="true" size="true" to="/contact">Contact Us</Button>
                    <Button primary="true" round="true" size="true" to="/contact">Login</Button>
                </BtnWrapper>
            </DropDownWrapper>
        </DropDownContainer>
    );
}

export default DropDownMenu;
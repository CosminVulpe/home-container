import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Button = styled(Link)`
    background:${({primary}) => (primary ? '#000d1a' : 'CD853F')};
    white-space: nowrap;
    outline: none;
    border: none;
    min-width: 100px;
    max-width: 200px;
    cursor: pointer;
    text-declaration: none;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:${({ sizeBig }) => (sizeBig ? '16px 40px' : '14px 24px')};
    color: ${({ primary }) => (primary ? '#fff' : '#000d1a')};
    font-size:${({ sizeBig }) => (sizeBig ? '25px' : '15px')};
    margin: 5px;
    
    &:hover{
        transform: translateY(-2px);
`;

import React, {useState} from "react";
import {Button, Flex, FormControl, FormLabel, Heading, Image, Input, Stack,} from '@chakra-ui/react';
import CoverImage from '../../images/login-image/img.png';
import {useNavigate} from "react-router-dom";
import {userLogin} from "../../service/authentication-service/AuthenticationService";
import {authenticationFailure, authenticationSuccess} from "../redux/Authentication";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorNotification} from "../../service/toastify-notifications/ToastifyNotifications";

function Login() {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        userName: "",
        password: ""
    });

    function onChangeEvent(e) {
        e.persist();
        setValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    function handleClickEvent() {
        userLogin(values, "/login")
            .then((response) => {
                if (response.status === 200) {
                    authenticationSuccess(response.data);
                    navigate("/");
                }
            }).catch(error => {
            if (error && error.response) {
                switch (error.response.status) {
                    case 401:
                        authenticationFailure('Something Wrong!Please Try Again')
                        errorNotification("Authentication Failed. Bad Credentials");
                        break;
                    default:
                        authenticationFailure("Something Wrong!Please Try Again");
                        errorNotification("Authentication Failed. Bad Credentials");
                }
            }
        });
    }


    return (
        <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
            <ToastContainer/>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <FormControl id="email" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" name="userName" onChange={onChangeEvent}/>
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" onChange={onChangeEvent}/>
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{base: 'column', sm: 'row'}}
                            align={'start'}
                            justify={'space-between'}>
                        </Stack>
                        <Button colorScheme={'blue'} variant={'solid'} onClick={handleClickEvent}>
                            Sign in
                        </Button>
                        <Button colorScheme={'blue'} variant={'solid'} onClick={() => navigate("/")}>
                            Back Home
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={CoverImage}
                />
            </Flex>
        </Stack>
    );
}

export default Login;

import React, {useState} from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useNavigate} from "react-router-dom";
import {userLogin} from "../../service/authentication-service/AuthenticationService";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {authentication, authenticationFailure} from "../redux/Authentication";
import {errorNotification, successfulNotification} from "../../service/toastify-notifications/ToastifyNotifications";


function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginCredentials, setLoginCredentials] = useState({
        firstName: "",
        lastName: "",
        username: "",
        emailAddress: "",
        password: ""
    });
    const [isUserRegister, setIsUseRegister] = useState(false);
    const {onClose} = useDisclosure();
    const navigate = useNavigate();


    function onChangeEvent(e) {
        e.persist();
        setLoginCredentials(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    function onClickHandleEvent() {
        authentication();
        userLogin(loginCredentials, "/register")
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    setIsUseRegister(true);
                    successfulNotification("Account register successful")
                } else {
                    authenticationFailure("Something Wrong!Please Try Again");
                    errorNotification("Something Wrong!Please Try Again");
                }
            }).catch(error => {
            authenticationFailure("Authentication Failed. Bad Credentials");
            errorNotification("Something Wrong!Please Try Again");
        });
    }


    function checkLoginCredentials() {
        for (let [key, value] of Object.entries(loginCredentials)) {
            if (value.length === 0) {
                return false;
            }
        }
        return true;
    }

    return (
        <>
            <ToastContainer/>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input type="text" name="firstName" minLength={3}
                                               value={loginCredentials.firstName}
                                               onChange={onChangeEvent}/>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input type="text" name="lastName" value={loginCredentials.lastName}
                                               onChange={onChangeEvent}/>
                                    </FormControl>
                                </Box>
                            </HStack>

                            <FormControl id="username" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" name="username" value={loginCredentials.username}
                                       onChange={onChangeEvent}/>
                            </FormControl>

                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" name="emailAddress" value={loginCredentials.emailAddress}
                                       onChange={onChangeEvent}/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}
                                           name="password"
                                           minLength={5}
                                           onChange={onChangeEvent}/>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button onClick={onClickHandleEvent}
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        isDisabled={!checkLoginCredentials()}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user?
                                    <br/>
                                    <Link
                                        color={'blue.500'}
                                        onClick={() => navigate("/login")}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                {isUserRegister &&
                    <>
                        <Modal isOpen={isUserRegister} onClose={onClose}>
                            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>Redirect</ModalHeader>
                                <ModalCloseButton/>
                                <ModalBody>
                                    <p>Thank you for creating an account!<br/><br/>
                                        Where would you like to go?<br/><br/>
                                        Please choose from the options below.</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={() => navigate("/login")}>
                                        Login Page
                                    </Button>
                                    <Button variant='solid' onClick={() => navigate("/")}>Home Page</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                }
            </Flex>
        </>
    );
}


export default Register;

import React, {useState} from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack, Image,
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
import {registerUser} from "../api/AuthenticationService";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CoverImage from "../../images/login-image/img.png";


function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginCredentials, setLoginCredentials] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: ""
    });
    const [isUserRegister, setIsUseRegister] = useState(false);
    const {onClose} = useDisclosure();
    let navigate = useNavigate();


    function onChangeEvent(e) {
        e.persist();
        setLoginCredentials(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    function onClickHandleEvent() {
        registerUser(loginCredentials)
            .then(response => {
                if (response.status === 200) {
                    setIsUseRegister(true);
                    toast('✅ Account register successful', {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }).catch(error => console.log(error));
    }


    return (
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
                                    <Input type="text" name="firstName" value={loginCredentials.firstName}
                                           onChange={onChangeEvent}/>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" name="lastName" value={loginCredentials.lastName}
                                           onChange={onChangeEvent}/>
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name="emailAddress" value={loginCredentials.emailAddress}
                                   onChange={onChangeEvent}/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name="password"
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
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'green.500',
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
                    <ToastContainer/>
                    <Modal isOpen={isUserRegister} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <p>Thank you for creating an account! Please choose from the option above.</p>
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
    );
}


export default Register;
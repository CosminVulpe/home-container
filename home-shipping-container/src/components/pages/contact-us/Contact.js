import GlobalStyle from "../../global-style/GlobalStyles";
import NavBar from "../../navBar/NavBar";
import React, {useRef, useState} from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    Textarea,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import {MdEmail, MdFacebook, MdLocationOn, MdOutlineEmail, MdPhone,} from 'react-icons/md';
import {BsDiscord, BsGithub, BsPerson} from 'react-icons/bs';
import Footer from "../../footer/Footer";
import {useAtom} from "jotai";
import {USER_INFO} from "../../jotai-atom/useAtom";
import {
    submitFormEmail,
    sendEmail
} from "../send-email-service/EmailService";
import {ToastContainer} from "react-toastify";

function Contact() {
    const form = useRef();
    const [contactInfo, setContactInfo] = useState({
        name: "",
        user_email: "",
        message: "",
    });
    const [userInfo, setUserInfo] = useAtom(USER_INFO);

    function onChangeEvent(e) {
        e.persist();
        setContactInfo(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <>
            <GlobalStyle/>
            <NavBar/>
            <ToastContainer/>
            <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
                <Box padding='28' color='black'>
                    <Flex>
                        <Box
                            bg="#02054B"
                            color="white"
                            borderRadius="lg"
                            m={{sm: 4, md: 16, lg: 10}}
                            p={{sm: 5, md: 5, lg: 16}}>
                            <Box p={4}>
                                <Wrap spacing={{base: 20, sm: 3, md: 5, lg: 20}}>
                                    <WrapItem>
                                        <Box>
                                            <Heading>Contact</Heading>
                                            <Text mt={{sm: 3, md: 3, lg: 5}} color="gray.500">
                                                Fill up the form below to contact
                                            </Text>
                                            <Box py={{base: 5, sm: 5, md: 8, lg: 10}}>
                                                <VStack pl={0} spacing={3} alignItems="flex-start">
                                                    <Button
                                                        size="md"
                                                        height="48px"
                                                        width="200px"
                                                        variant="ghost"
                                                        color="#DCE2FF"
                                                        _hover={{border: '2px solid #1C6FEB'}}
                                                        leftIcon={<MdPhone color="#1970F1" size="20px"/>}>
                                                        +407645789324
                                                    </Button>
                                                    <Button
                                                        size="md"
                                                        height="48px"
                                                        width="200px"
                                                        variant="ghost"
                                                        color="#DCE2FF"
                                                        _hover={{border: '2px solid #1C6FEB'}}
                                                        leftIcon={<MdEmail color="#1970F1" size="20px"/>}>
                                                        container@gmail.com
                                                    </Button>
                                                    <Button
                                                        size="md"
                                                        height="48px"
                                                        width="200px"
                                                        variant="ghost"
                                                        color="#DCE2FF"
                                                        _hover={{border: '2px solid #1C6FEB'}}
                                                        leftIcon={<MdLocationOn color="#1970F1" size="20px"/>}>
                                                        Bucharest, Romania
                                                    </Button>
                                                </VStack>
                                            </Box>
                                            <HStack
                                                mt={{lg: 10, md: 10}}
                                                spacing={5}
                                                px={5}
                                                alignItems="flex-start">
                                                <IconButton
                                                    aria-label="facebook"
                                                    variant="ghost"
                                                    size="lg"
                                                    isRound={true}
                                                    _hover={{bg: '#0D74FF'}}
                                                    icon={<MdFacebook size="28px"/>}
                                                />
                                                <IconButton
                                                    aria-label="github"
                                                    variant="ghost"
                                                    size="lg"
                                                    isRound={true}
                                                    _hover={{bg: '#0D74FF'}}
                                                    icon={<BsGithub size="28px"/>}
                                                />
                                                <IconButton
                                                    aria-label="discord"
                                                    variant="ghost"
                                                    size="lg"
                                                    isRound={true}
                                                    _hover={{bg: '#0D74FF'}}
                                                    icon={<BsDiscord size="28px"/>}
                                                />
                                            </HStack>
                                        </Box>
                                    </WrapItem>
                                    <WrapItem>
                                        <Box bg="white" borderRadius="lg">
                                            <Box m={8} color="#0B0E3F">
                                                <VStack spacing={5}>
                                                    <FormControl id="name">
                                                        <FormLabel>Your Name</FormLabel>
                                                        <InputGroup borderColor="#E0E1E7">
                                                            <InputLeftElement
                                                                pointerEvents="none"
                                                                children={<BsPerson color="gray.800"/>}
                                                            />
                                                            <Input type="text" size="md" name="name"
                                                                   onChange={onChangeEvent}/>
                                                        </InputGroup>
                                                    </FormControl>
                                                    <FormControl id="name">
                                                        <FormLabel>Mail</FormLabel>
                                                        <InputGroup borderColor="#E0E1E7">
                                                            <InputLeftElement
                                                                pointerEvents="none"
                                                                children={<MdOutlineEmail color="gray.800"/>}
                                                            />
                                                            <Input type="text" size="md"
                                                                   name="user_email" onChange={onChangeEvent}/>
                                                        </InputGroup>
                                                    </FormControl>
                                                    <FormControl id="name">
                                                        <FormLabel>Message</FormLabel>
                                                        <Textarea
                                                            borderColor="gray.300"
                                                            _hover={{
                                                                borderRadius: 'gray.300',
                                                            }}
                                                            name="message"
                                                            placeholder="message"
                                                            onChange={onChangeEvent}
                                                        />
                                                    </FormControl>
                                                    <FormControl id="name" float="right">
                                                        <Button
                                                            variant="solid"
                                                            bg="#0D74FF"
                                                            color="white"
                                                            _hover={{}}
                                                            onClick={() => submitFormEmail()}
                                                        >
                                                            Send Message
                                                        </Button>
                                                    </FormControl>
                                                </VStack>
                                            </Box>
                                        </Box>
                                    </WrapItem>
                                </Wrap>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Container>
            <Footer/>
            <div style={{display: "none"}}>
                <form ref={form} onSubmit={(e) => sendEmail(e, form, "template_kbbhldg")}>
                    <label>Name</label>
                    {userInfo !== null ?
                        <>
                            <input type="text" name="name" value={userInfo.firstName + " " + userInfo.lastName}/>
                            <label>Email</label>
                            <input type="email" name="user_email" value={userInfo.emailAddress}/>
                        </>
                        :
                        <>
                            <input type="text" name="name" value={contactInfo.name}/>
                            <label>Email</label>
                            <input type="email" name="user_email" value={contactInfo.user_email}/>
                        </>
                    }
                    <label>Message</label>
                    <textarea name="message" value={contactInfo.message}/>
                    <input type="submit" value="Send" id="submit_email"/>
                </form>
            </div>
        </>
    )
}

export default Contact;

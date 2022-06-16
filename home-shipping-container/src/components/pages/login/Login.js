import React from "react";
import {Button, Flex, FormControl, FormLabel, Heading, Image, Input, Link, Stack,} from '@chakra-ui/react';
import CoverImage from '../../images/login-image/img.png';
import {useNavigate} from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    return (
        <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email"/>
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password"/>
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{base: 'column', sm: 'row'}}
                            align={'start'}
                            justify={'space-between'}>
                            {/*<Checkbox>Remember me</Checkbox>*/}
                            <Link color={'blue.500'}>Forgot password?</Link>
                        </Stack>
                        <Button colorScheme={'blue'} variant={'solid'}>
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
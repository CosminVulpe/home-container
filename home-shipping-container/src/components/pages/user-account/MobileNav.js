import {
    Avatar,
    Flex,
    FlexProps,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {FiMenu} from "react-icons/fi";
import {useAtom} from "jotai";
import {USER_INFO} from "../../jotai-atom/useAtom";

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

function MobileNav({onOpen, ...remaining}: MobileProps) {
    const [userInfo, setUserInfo] = useAtom(USER_INFO);

    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...remaining}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Home Container
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{userInfo.firstName + " " + userInfo.lastName}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                    </Text>
                                </VStack>
                            </HStack>
                        </MenuButton>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
}

export default MobileNav;
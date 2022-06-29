import {Box, BoxProps, CloseButton, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {LinkItems} from "./AccountUser";
import NavItemUserAccount from "./NavItemUserAccount";

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

function SidebarContent({onClose, ...remaining}: SidebarProps) {

    return(
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...remaining}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Home Container
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItemUserAccount
                    key={link.name}
                    icon={link.icon}
                    link={link.page}>
                    {link.name}
                </NavItemUserAccount>
            ))}
        </Box>
    );
}
export default SidebarContent;
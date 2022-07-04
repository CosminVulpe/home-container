import {IconType} from 'react-icons';
import {ReactText} from "react";
import {Flex, FlexProps, Icon, Link} from "@chakra-ui/react";

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}

function NavItemUserAccount({icon, children, link, ...remaining}: NavItemProps) {

    return (
        <Link
            href={(link !== "/order-history") ? link : "#"}
            style={{textDecoration: 'none'}}
            _focus={{boxShadow: 'none'}}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...remaining}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    )
}

export default NavItemUserAccount;
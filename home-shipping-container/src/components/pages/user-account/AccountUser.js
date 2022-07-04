import React, {useEffect, useState} from 'react';
import {
    Box,
    Drawer,
    DrawerContent,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {FiHome, FiSettings} from 'react-icons/fi';
import {FaHistory} from 'react-icons/fa';
import {IconType} from 'react-icons';
import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";
import {fetchUserData} from "../authentication-service/AuthenticationService";

interface LinkItemProps {
    name: string;
    icon: IconType;
}

export const LinkItems: Array<LinkItemProps> = [
    {name: 'Home', icon: FiHome, page: "/"},
    {name: 'Order History', icon: FaHistory, page: "/order-history"}
];


function AccountUser() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [userOrderHistory, setUserOrderHistory] = useState([]);
    const [userContainersHistory, setUserContainersHistory] = useState([]);

    useEffect(() => {
        fetchUserData("/user/reservations")
            .then(response => {
                setUserOrderHistory(response.data)
            })
            .catch(error => console.log(error));

        fetchUserData("/user/reservation/containers")
            .then(reserved => setUserContainersHistory(reserved.data))
            .catch(error => console.log(error));

    }, []);

    return (
        <>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <SidebarContent
                    onClose={() => onClose}
                    display={{base: 'none', md: 'block'}}
                />
                <Drawer
                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full">
                    <DrawerContent>
                        <SidebarContent onClose={onClose}/>
                    </DrawerContent>
                </Drawer>
                <MobileNav onOpen={onOpen}/>
                <Box ml={{base: 10, md: 300}} p="16">
                    <div className="container">
                        {userOrderHistory.length !== 0 ?
                            <TableContainer>
                                <Table variant='striped' colorScheme="teal">
                                    <Thead>
                                        <Tr>
                                            <Th>Reservation ID</Th>
                                            <Th>Shipping Container Name</Th>
                                            <Th>Start Date</Th>
                                            <Th>Finish Date</Th>
                                            <Th>Total Number of Days</Th>
                                            <Th>Total Price</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {userOrderHistory.map((item, index) =>
                                            <Tr key={index}>
                                                <Td>{item.reservationId}</Td>
                                                <Td>{userContainersHistory[index]}</Td>
                                                <Td>{item.startDate}</Td>
                                                <Td>{item.finishDate}</Td>
                                                <Td>{item.totalNumberOfDays}</Td>
                                                <Td>{item.totalPrice}</Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            :
                            <Heading> No order history</Heading>
                        }
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default AccountUser;
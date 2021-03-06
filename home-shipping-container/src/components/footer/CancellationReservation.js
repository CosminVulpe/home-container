import React, {useState} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {errorNotification, successfulNotification} from "../service/toastify-notifications/ToastifyNotifications";
import {ToastContainer} from "react-toastify";
import {ApiPostReservation} from "../service/api-requests/ApiService";

function CancellationReservation() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [reservationIdUser, setReservationIdUser] = useState("");

    async function onClickHandleEvent() {
        const data = {
            reservationId: reservationIdUser
        }

        await ApiPostReservation(data, "cancel-reservation")
            .then(response => {
                if (response.status === 200) {
                    successfulNotification("Reservation cancel!");
                }
            })
            .catch(error => errorNotification("Wrong reservation id"));
    }

    return (
        <>

            <Button onClick={onOpen}>Cancellation</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                autoFocus={true}
                closeOnEsc={true}
                colorScheme={"blue"}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Please introduce reservation ID for cancellation</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Reservation ID</FormLabel>
                            <Input placeholder='Reservation ID' onChange={(e) => setReservationIdUser(e.target.value)}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClickHandleEvent}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer/>
        </>
    );
}

export default CancellationReservation;

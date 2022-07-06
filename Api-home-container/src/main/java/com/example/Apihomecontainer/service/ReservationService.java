package com.example.Apihomecontainer.service;

import com.example.Apihomecontainer.model.ApplicationUser;
import com.example.Apihomecontainer.model.Reservation;
import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.model.enums.ReservationStatus;
import com.example.Apihomecontainer.service.DAO.ReservationRepository;
import com.example.Apihomecontainer.service.DAO.ShippingContainerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ShippingContainerRepository shippingContainerRepository;
    private final ApplicationUserService applicationUserService;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository
            , ShippingContainerRepository shippingContainerRepository
            , ApplicationUserService applicationUserService) {
        this.reservationRepository = reservationRepository;
        this.shippingContainerRepository = shippingContainerRepository;
        this.applicationUserService = applicationUserService;
    }

    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    public void addNewReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }


    public void addReservation(Reservation reservation
            , Long containerId) {
        Optional<ShippingContainer> shippingContainerOptional = shippingContainerRepository.
                findById(containerId);
        Reservation newReservation;

        if (checkIfShippingContainerExists(shippingContainerOptional)) {
            if (reservation.getApplicationUser() != null) {
                newReservation = createNewReservation(reservation
                        , reservation.getApplicationUser()
                        , shippingContainerOptional.get());
                UserDetails userDetails = applicationUserService.loadUserByUsername(reservation.getApplicationUser().getUsername());
                reservation.getApplicationUser().addReservation(newReservation, userDetails);
            } else {
                newReservation = createNewReservation(reservation, null, shippingContainerOptional.get());
                shippingContainerOptional.get().addReservations(newReservation);
            }
            addNewReservation(newReservation);
            log.info("The reservation was made!");
        }
    }

    private boolean checkIfShippingContainerExists(Optional<ShippingContainer> optionalShippingContainer) {
        return optionalShippingContainer.isPresent();
    }

    public UUID getReservationId(Long containerId) {
        Optional<ShippingContainer> shippingContainerOption = shippingContainerRepository.findById(containerId);
        List<UUID> allReservationIds = new ArrayList<>();
        if (shippingContainerOption.isPresent()) {
            for (Reservation reservation : shippingContainerOption.get().getReservationList()) {
                allReservationIds.add(reservation.getReservationId());
            }
        }
        return allReservationIds.get(allReservationIds.size() - 1);
    }

    public void cancelReservation(Reservation reservation) {
        for (ShippingContainer shippingContainer : shippingContainerRepository.findAll()) {
            for (Reservation reservationDB : shippingContainer.getReservationList()) {
                if (doesReservationIdExists(reservationDB.getReservationId()
                        , reservation.getReservationId())) {
                    reservationDB.setReservationStatus(ReservationStatus.NOT_OCCUPY);
                    reservationRepository.save(reservationDB);
                }
            }
        }
    }

    private boolean doesReservationIdExists(UUID reservationDB, UUID reservationIdUser) {
        return reservationDB.equals(reservationIdUser);
    }

    private Reservation createNewReservation(Reservation reservation
            , ApplicationUser user
            , ShippingContainer shippingContainer) {
        if (user != null) {
            return new Reservation(
                    reservation.getReservationCustomerName()
                    , reservation.getReservationCustomerEmail()
                    , reservation.getStartDate()
                    , reservation.getFinishDate()
                    , reservation.getNumberAdults()
                    , reservation.getNumberKids()
                    , ReservationStatus.OCCUPY
                    , reservation.getTotalNumberOfDays()
                    , reservation.getTotalPrice()
                    , shippingContainer
                    , reservation.getApplicationUser()
            );
        }
        return new Reservation(
                reservation.getReservationCustomerName()
                , reservation.getReservationCustomerEmail()
                , reservation.getStartDate()
                , reservation.getFinishDate()
                , reservation.getNumberAdults()
                , reservation.getNumberKids()
                , ReservationStatus.OCCUPY
                , reservation.getTotalNumberOfDays()
                , reservation.getTotalPrice()
                , shippingContainer
                , null
        );
    }


}

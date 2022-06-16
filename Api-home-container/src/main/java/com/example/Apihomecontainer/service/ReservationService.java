package com.example.Apihomecontainer.service;

import com.example.Apihomecontainer.model.Reservation;
import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.model.enums.ReservationStatus;
import com.example.Apihomecontainer.service.DAO.ReservationRepository;
import com.example.Apihomecontainer.service.DAO.ShippingContainerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ShippingContainerRepository shippingContainerRepository;
    private static final Logger LOG = LoggerFactory.getLogger(ReservationService.class);

    @Autowired
    public ReservationService(ReservationRepository reservationRepository
            , ShippingContainerRepository shippingContainerRepository) {
        this.reservationRepository = reservationRepository;
        this.shippingContainerRepository = shippingContainerRepository;
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

        if (checkIfShippingContainerExists(shippingContainerOptional)) {
            Reservation newReservation = new Reservation(
                    reservation.getReservationCustomerName()
                    , reservation.getReservationCustomerEmail()
                    , reservation.getStartDate()
                    , reservation.getFinishDate()
                    , reservation.getNumberAdults()
                    , reservation.getNumberKids()
                    , ReservationStatus.OCCUPY
                    , reservation.getTotalNumberOfDays()
                    , reservation.getTotalPrice()
                    , shippingContainerOptional.get()
            );
            shippingContainerOptional.get().addReservations(newReservation);
            addNewReservation(newReservation);
            LOG.info("The reservation was made!");
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

}

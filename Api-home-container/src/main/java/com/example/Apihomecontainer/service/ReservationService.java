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


    public ReservationStatus checkReservationDates(Reservation reservation
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
            if (checkReservations(shippingContainerOptional.get().getReservationList())) {
                shippingContainerOptional.get().addReservations(newReservation);
                addNewReservation(newReservation);
            } else {
                for (Reservation element : shippingContainerOptional.get().getReservationList()) {
                    if (checkSimilarReservationDates(element.getStartDate().getDayOfMonth()
                            , reservation.getStartDate().getDayOfMonth()
                            , element.getStartDate().getMonthValue()
                            , reservation.getStartDate().getMonthValue())) {
                        LOG.warn("The dates are equal, container occupied");
                        return ReservationStatus.OCCUPY;
                    }
                    LOG.info("The reservation was made!");
                    addNewReservation(newReservation);
                    return ReservationStatus.NOT_OCCUPY;
                }
            }
        }
        return ReservationStatus.NOT_OCCUPY;
    }


    private boolean checkIfShippingContainerExists(Optional<ShippingContainer> optionalShippingContainer) {
        return optionalShippingContainer.isPresent();
    }

    private boolean checkReservations(List<Reservation> reservations) {
        return reservations.isEmpty();
    }

    private boolean checkSimilarReservationDates(int startDay
            , int startDayUser
            , int startMonth
            , int startMonthUser) {
        return (startDay == startDayUser) && (startMonth == startMonthUser);

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

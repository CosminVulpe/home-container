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

import java.util.List;
import java.util.Objects;
import java.util.Optional;

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

        if (shippingContainerOptional.isPresent()) {
            Reservation newReservation = new Reservation(
                    reservation.getReservationCustomerName()
                    , reservation.getReservationCustomerEmail()
                    , reservation.getStartDay()
                    , reservation.getStartMonth()
                    , reservation.getYear()
                    , reservation.getFinishDay()
                    , reservation.getFinishMonth()
                    , reservation.getNumberAdults()
                    , reservation.getNumberKids()
                    , reservation.getTotalNumberOfDays()
                    , ReservationStatus.OCCUPY
                    , reservation.getTotalPrice()
                    , shippingContainerOptional.get()
            );
            if (shippingContainerOptional.get().getReservationList().size() == 0) {
                shippingContainerOptional.get().addReservations(newReservation);
                addNewReservation(newReservation);
            } else {
                for (Reservation element : shippingContainerOptional.get().getReservationList()) {
                    if (Objects.equals(element.getStartDay(), reservation.getStartDay())
                            && Objects.equals(element.getStartMonth(), reservation.getStartMonth())) {
                        LOG.warn("The dates are equal, container occupied");
                        return ReservationStatus.OCCUPY;
                    } else {
                        addNewReservation(newReservation);
                        return ReservationStatus.NOT_OCCUPY;

                    }
                }
            }
        }
        return ReservationStatus.NOT_OCCUPY;
    }

}

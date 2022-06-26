package com.example.Apihomecontainer.service;

import com.example.Apihomecontainer.model.Reservation;
import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.model.enums.ReservationStatus;
import com.example.Apihomecontainer.service.DAO.ShippingContainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShippingContainerService {

    private final ShippingContainerRepository shippingContainerRepository;

    @Autowired
    public ShippingContainerService(ShippingContainerRepository shippingContainerRepository) {
        this.shippingContainerRepository = shippingContainerRepository;
    }

    public List<ShippingContainer> getAll() {
        return shippingContainerRepository.findAll();
    }

    public ShippingContainer getContainerById(Long id) {
        Optional<ShippingContainer> optionalShippingContainer = shippingContainerRepository.findById(id);
        return optionalShippingContainer.orElse(null);
    }

    public List<LocalDate> getDatesContainerOccupy(Long containerId) {
        List<LocalDate> reservationDateOccupied = new ArrayList<>();
        for (Reservation reservation : getContainerById(containerId).getReservationList()) {

            reservationDateOccupied.addAll(
                    List.of(
                            reservation.getStartDate()
                            , reservation.getFinishDate()
                    )
            );
        }
        return reservationDateOccupied;
    }

    public List<LocalDate> removeDates(Long containerId) {
        List<LocalDate> deleteDates = new ArrayList<>();
        for(Reservation reservation :getContainerById(containerId).getReservationList()){
            if(isDateOccupied(reservation.getReservationStatus())){
                deleteDates.addAll(
                        List.of(reservation.getStartDate(), reservation.getFinishDate())
                );
            }
        }
        return deleteDates;
    }

    private boolean isDateOccupied(ReservationStatus reservationStatus) {
        return reservationStatus == ReservationStatus.NOT_OCCUPY;
    }
}

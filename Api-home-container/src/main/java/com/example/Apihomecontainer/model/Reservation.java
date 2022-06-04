package com.example.Apihomecontainer.model;

import lombok.*;

import javax.persistence.*;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "reservation")
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @SequenceGenerator(
            name = "reservation_sequence",
            sequenceName = "reservation_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "reservation_sequence"
    )
    private Long id;
    private Integer startDay;
    private Integer startMonth;
    private Integer year;
    private Integer finishDay;
    private Integer finishMonth;
    private Integer numberAdults;
    private Integer numberKids;

    private Double pricePerNight;
    private String reservationStatus;

    @Transient
    private Integer totalNumberOfDays;

    @Transient
    private Double totalPrice;


    public Integer getTotalNumberOfDays() {
        LocalDate fromDate = LocalDate.of(year, startMonth, startDay);
        LocalDate toDate = LocalDate.of(year, finishMonth, finishDay);
        return Math.toIntExact(ChronoUnit.DAYS.between(fromDate, toDate));
    }


    public Double getTotalPrice() {
        return getTotalNumberOfDays() * pricePerNight;
    }

    public String transformTotalPriceStrCurrency(double sum) {
        return NumberFormat.getCurrencyInstance().format(sum);
    }
}

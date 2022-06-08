package com.example.Apihomecontainer.model;

import com.example.Apihomecontainer.model.enums.ReservationStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

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
    private String reservationCustomerName;
    private String reservationCustomerEmail;
    private Integer startDay;
    private Integer startMonth;
    private Integer year;
    private Integer finishDay;
    private Integer finishMonth;
    private Integer numberAdults;
    private Integer numberKids;

    @Enumerated(EnumType.STRING)
    private ReservationStatus reservationStatus;

    private Integer totalNumberOfDays;
    private Double totalPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_container_id", referencedColumnName = "id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private ShippingContainer container;


    public int getTotalNumberOfDays() {
        LocalDate fromDate = LocalDate.of(year, startMonth, startDay);
        LocalDate toDate = LocalDate.of(year, finishMonth, finishDay);
        return Math.toIntExact(ChronoUnit.DAYS.between(fromDate, toDate));
    }

//    public int getTotalPrice() {
//        return getTotalNumberOfDays() * container.getPricePerNight();
//    }

//    public String transformTotalPriceStrCurrency(double sum) {
//        return NumberFormat.getCurrencyInstance().format(sum);
//    }

    public Reservation(
            String reservationCustomerName
            , String reservationCustomerEmail
            , Integer startDay
            , Integer startMonth
            , Integer year
            , Integer finishDay
            , Integer finishMonth
            , Integer numberAdults
            , Integer numberKids
            , Integer totalNumberOfDays
            , ReservationStatus reservationStatus
            , Double totalPrice
            , ShippingContainer container) {
        this.reservationCustomerName = reservationCustomerName;
        this.reservationCustomerEmail = reservationCustomerEmail;
        this.startDay = startDay;
        this.startMonth = startMonth;
        this.year = year;
        this.finishDay = finishDay;
        this.finishMonth = finishMonth;
        this.numberAdults = numberAdults;
        this.numberKids = numberKids;
        this.totalNumberOfDays = totalNumberOfDays;
        this.reservationStatus = reservationStatus;
        this.totalPrice = totalPrice;
        this.container = container;
    }
}

package com.example.Apihomecontainer.model;

import com.example.Apihomecontainer.model.enums.ReservationStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.UUID;

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
    private UUID reservationId;
    private String reservationCustomerName;
    private String reservationCustomerEmail;
    private LocalDate startDate;
    private LocalDate finishDate;
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


//    public int getTotalNumberOfDays() {
//        LocalDate fromDate = LocalDate.of(year, startMonth, startDay);
//        LocalDate toDate = LocalDate.of(year, finishMonth, finishDay);
//        return Math.toIntExact(ChronoUnit.DAYS.between(fromDate, toDate));
//    }

//    public int getTotalPrice() {
//        return getTotalNumberOfDays() * container.getPricePerNight();
//    }

//    public String transformTotalPriceStrCurrency(double sum) {
//        return NumberFormat.getCurrencyInstance().format(sum);
//    }




    public Reservation(String reservationCustomerName
            , String reservationCustomerEmail
            , LocalDate startDate
            , LocalDate finishDate
            , Integer numberAdults
            , Integer numberKids
            , ReservationStatus reservationStatus
            , Integer totalNumberOfDays
            , Double totalPrice
            , ShippingContainer container) {
        this.reservationCustomerName = reservationCustomerName;
        this.reservationCustomerEmail = reservationCustomerEmail;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.numberAdults = numberAdults;
        this.numberKids = numberKids;
        this.reservationStatus = reservationStatus;
        this.totalNumberOfDays = totalNumberOfDays;
        this.totalPrice = totalPrice;
        this.container = container;
        this.reservationId = UUID.randomUUID();
    }
}

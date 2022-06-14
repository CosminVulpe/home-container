package com.example.Apihomecontainer.model;

import lombok.*;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "shipping_container")
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingContainer {

    @Id
    @SequenceGenerator(
            name = "shipping_container_sequence",
            sequenceName = "shipping_container_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "shipping_container_sequence"
    )
    private Long id;



    private String name;
    private String description;
    private Integer pricePerNight;
    @OneToMany(cascade = CascadeType.ALL
            , mappedBy = "container")
    private List<Reservation> reservationList;

    public ShippingContainer(String name
            , String description
            , Integer pricePerNight) {

        this.name = name;
        this.description = description;
        this.pricePerNight = pricePerNight;
    }

    public void addReservations(Reservation reservation) {
        reservationList.add(reservation);
        reservation.setContainer(this);
    }
}
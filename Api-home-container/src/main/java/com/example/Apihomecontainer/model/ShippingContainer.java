package com.example.Apihomecontainer.model;

import lombok.*;

import javax.persistence.*;

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

    private String imageUrl;

    @Transient
    private Reservation reservation;

    public ShippingContainer(String name
            , String description
            , String imageUrl) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
package com.example.Apihomecontainer.model;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "reviews")
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @SequenceGenerator(
            name = "review_sequence",
            sequenceName = "review_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "review_sequence"
    )
    private Long id;
    private String userName;
    private String description;
    private String avatarImageUrl;

    public Review(String userName
            , String avatarImageUrl
            , String description) {
        this.userName = userName;
        this.avatarImageUrl = avatarImageUrl;
        this.description = description;
    }
}


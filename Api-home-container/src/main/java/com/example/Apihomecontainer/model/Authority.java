package com.example.Apihomecontainer.model;


import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;


@Entity(name = "authority")
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Authority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Role")
    private String role;

    @Column(name="Role_Description")
    private String roleDescription;


    @Override
    public String getAuthority() {
        return role;
    }
}

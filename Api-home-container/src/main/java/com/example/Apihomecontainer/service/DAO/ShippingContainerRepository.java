package com.example.Apihomecontainer.service.DAO;

import com.example.Apihomecontainer.model.ShippingContainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingContainerRepository extends JpaRepository<ShippingContainer, Long> {

}

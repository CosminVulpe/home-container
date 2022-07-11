package com.example.Apihomecontainer.service;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClientPayment {
    @Value("${stripe_key}")
    private String secretKeyStripe;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKeyStripe;
    }

    public Charge chargeNewCard(String token, double amount) throws Exception {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int) (amount * 100));
        chargeParams.put("currency", "RON");
        chargeParams.put("source", token);
        return Charge.create(chargeParams);
    }

}

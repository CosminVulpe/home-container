package com.example.Apihomecontainer.controller;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClientPayment {

    StripeClientPayment() {
        Stripe.apiKey = "sk_test_51LAYjtL0ph6rc8pviLOPUPiWRZwNVXpAEmFcxVJuPgpAu48MIFI5FuQACJlggXzRADjQZY0xyMQzIwJHThetaKet00MLonmsbZ";
    }

    public Customer createCustomer(String token
            , String email) throws Exception {
        Map<String, Object> customerParams = new HashMap<>();
        customerParams.put("email", email);
        customerParams.put("source", token);
        return Customer.create(customerParams);
    }

    private Customer getCustomer(String id) throws Exception {
        return Customer.retrieve(id);
    }

    public Charge chargeNewCard(String token, double amount) throws Exception {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount",(int)(amount * 100));
        chargeParams.put("currency", "RON");
        chargeParams.put("source", token);
        return Charge.create(chargeParams);
    }

    public Charge chargeCustomerCard(String customerId, int amount) throws Exception{
        String sourceCard = getCustomer(customerId).getDefaultSource();
        Map<String,Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "USD");
        chargeParams.put("customer", customerId);
        chargeParams.put("source", sourceCard);
        return Charge.create(chargeParams);
    }
}

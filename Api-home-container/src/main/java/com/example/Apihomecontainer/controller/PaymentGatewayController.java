package com.example.Apihomecontainer.controller;

import com.example.Apihomecontainer.service.StripeClientPayment;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/payment")
public class PaymentGatewayController {
    private final StripeClientPayment stripeClientPayment;

    @Autowired
    public PaymentGatewayController(StripeClientPayment stripeClientPayment) {
        this.stripeClientPayment = stripeClientPayment;
    }

    @PostMapping(path="/charge")
    public Charge chargeCard(@RequestHeader(value="token") String token
            ,@RequestHeader(value="amount") Double amount)throws Exception{
        return stripeClientPayment.chargeNewCard(token,amount);
    }
}

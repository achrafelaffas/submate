package submate.payment;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("payments")
@RequiredArgsConstructor
@Tag(name = "Payment")
public class paymentController {

    private final PaymentService paymentService;

    @GetMapping("subscription/{subscriptionId}")
    public ResponseEntity<List<PaymentResponse>> getPayments(@PathVariable("subscriptionId") Long subscriptionId) {
        return ResponseEntity.ok(paymentService.getPayments(subscriptionId));
    }

    @GetMapping("{id}")
    public ResponseEntity<PaymentResponse> getPaymentById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }
}
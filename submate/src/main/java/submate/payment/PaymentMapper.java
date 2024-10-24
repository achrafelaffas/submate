package submate.payment;

import org.springframework.stereotype.Service;

@Service
public class PaymentMapper {
    public PaymentResponse toPaymentResponse(Payment p) {
        return new PaymentResponse(p.getId(), p.getPrice(), p.getCreatedDate());
    }
}
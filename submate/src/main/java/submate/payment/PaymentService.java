package submate.payment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    public List<PaymentResponse> getPayments(Long subscriptionId) {
        return paymentRepository.findBySubscriptionId(subscriptionId).stream()
                .map(paymentMapper::toPaymentResponse).toList();
    }
    public PaymentResponse getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .map(paymentMapper::toPaymentResponse).orElseThrow();
    }
}

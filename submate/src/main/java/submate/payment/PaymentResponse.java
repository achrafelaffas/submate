package submate.payment;

import java.time.LocalDateTime;

public record PaymentResponse(
        Long id,
        double price,
        LocalDateTime paymentDate
) {
}

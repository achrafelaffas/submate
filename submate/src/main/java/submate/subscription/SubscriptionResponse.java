package submate.subscription;

import submate.category.CategoryDTO;
import submate.payment.PaymentResponse;

import java.time.LocalDate;
import java.util.List;

public record SubscriptionResponse(
        Long id,
        String plateform,
        CategoryDTO category,
        Billing billing,
        double price,
        String image,
        LocalDate dueDate,
        List<PaymentResponse> payments
) {
}

package submate.subscription;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record SubscriptionRequest(
        @NotNull(message = "100")
        String plateform,
        @NotNull(message = "101")
        Billing billing,
        @NotNull(message = "102")
        double price,
        @NotNull(message = "103")
        LocalDate startDate,
        @NotNull(message = "104")
        String image,
        Long categoryId,
        Long id
) {
}

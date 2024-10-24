package submate.subscription;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import submate.category.CategoryMapper;
import submate.payment.PaymentMapper;

@Service
@RequiredArgsConstructor
public class SubscriptionMapper {
    private final CategoryMapper categoryMapper;
    private final PaymentMapper paymentMapper;

    public SubscriptionResponse toSubscriptionResponse(Subscription subscription) {
        return new SubscriptionResponse(
                subscription.getId(),
                subscription.getPlateform(),
                categoryMapper.toCategoryDTO(subscription.getCategory()),
                subscription.getBilling(),
                subscription.getPrice(),
                subscription.getImage(),
                subscription.getDueDate(),
                subscription.getPayments().stream().map(paymentMapper::toPaymentResponse).toList()
        );
    }

    public Subscription toSubscription(SubscriptionRequest request) {
        return Subscription.builder()
                .plateform(request.plateform())
                .price(request.price())
                .startDate(request.startDate())
                .billing(request.billing())
                .image(request.image())
                .build();
    }
}

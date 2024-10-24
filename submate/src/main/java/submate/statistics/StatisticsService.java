package submate.statistics;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import submate.payment.PaymentMapper;
import submate.payment.PaymentRepository;
import submate.payment.PaymentResponse;
import submate.subscription.Subscription;
import submate.subscription.SubscriptionRepository;
import submate.user.User;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final SubscriptionRepository subscriptionRepository;
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    public List<SubscriptionsPerCategory> getSubscriptionsPerCategoryCount(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return subscriptionRepository.countSubscriptionByCategory(user.getId());
    }

    public List<PaymentResponse> getRecentPayments(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return paymentRepository.findBySubscriptionUserIdOrderByIdDesc(
                user.getId(), PageRequest.of(0, 5)
        ).stream().map(paymentMapper::toPaymentResponse).toList();
    }

    public List<ExpensePerCategory> getExpensesPerCategoryCount(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return paymentRepository.countExpenseByCategory(user.getId());
    }

    public SubscriptionStats getSubscriptionStats(Authentication auth) {
        User user = (User) auth.getPrincipal();
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);
        List<Subscription> subscription = subscriptionRepository.findAllByUserId(user.getId());
        long count = subscription.size();
        long lastweekCount = subscription.stream().filter(s -> s.getCreatedDate().isAfter(oneWeekAgo)).count();

        return new SubscriptionStats(count, lastweekCount);
    }

    public double getPaymentsTotal(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return paymentRepository.sumPriceBySubscriptionUserId(user.getId());
    }
}

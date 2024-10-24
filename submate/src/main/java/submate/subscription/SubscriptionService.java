package submate.subscription;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import submate.category.Category;
import submate.category.CategoryRepository;
import submate.payment.Payment;
import submate.payment.PaymentRepository;
import submate.user.User;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionMapper subscriptionMapper;
    private final CategoryRepository categoryRepository;
    private final PaymentRepository paymentRepository;

    public List<SubscriptionResponse> getSubscriptions(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return subscriptionRepository.findAllByUserId(user.getId()).stream()
                .map(subscriptionMapper::toSubscriptionResponse).toList();
    }

    public SubscriptionResponse getSubscriptionById(Long id) {
        return subscriptionRepository.findById(id)
                .map(subscriptionMapper::toSubscriptionResponse).orElseThrow();
    }

    public void createSubscription(SubscriptionRequest request, Authentication auth) {
        Subscription subscription = subscriptionMapper.toSubscription(request);
        Category category = categoryRepository.findById(request.categoryId()).orElseThrow();
        subscription.setUser((User) auth.getPrincipal());
        subscription.setCategory(category);
        LocalDate nextDueDate = nextPaymentDate(subscription.getStartDate(), subscription.getBilling());
        subscription.setDueDate(nextDueDate);
        subscriptionRepository.save(subscription);
    }

    public void updateSubscription(SubscriptionRequest request, Authentication auth) {
        Subscription subscription = subscriptionMapper.toSubscription(request);
        Subscription savedSubscription = subscriptionRepository.findById(request.id()).orElseThrow();
        subscription.setId(savedSubscription.getId());
        Category category = categoryRepository.findById(request.categoryId()).orElseThrow();
        subscription.setUser((User) auth.getPrincipal());
        subscription.setCategory(category);
        subscriptionRepository.save(subscription);
    }

    public void deleteSubscription(Long id) {
        if (subscriptionRepository.existsById(id))
            subscriptionRepository.deleteById(id);
    }

    public void makePayment(Subscription subscription) {
        Payment payment = Payment.builder()
                .price(subscription.getPrice())
                .subscription(subscription)
                .build();
        payment.setCreatedBy(subscription.getCreatedBy());
        paymentRepository.save(payment);
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void pay() {
        List<Subscription> subscriptions = subscriptionRepository.findAllByDueDate(LocalDate.now());
        for (Subscription s : subscriptions) {
            makePayment(s);
        }
    }

    public LocalDate nextPaymentDate(LocalDate startDate, Billing billingType) {
        LocalDate nextPaymentDate = startDate;

        if (billingType == Billing.MONTHLY) {
            nextPaymentDate = startDate.plusMonths(1);
        } else if (billingType == Billing.YEARLY) {
            nextPaymentDate = startDate.plusYears(1);
        }

        while (nextPaymentDate.isBefore(LocalDate.now())) {
            if (billingType == Billing.MONTHLY) {
                nextPaymentDate = nextPaymentDate.plusMonths(1);
            } else {
                nextPaymentDate = nextPaymentDate.plusYears(1);
            }
        }

        return nextPaymentDate;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void updateDueDate() {
        List<Subscription> subscriptions = subscriptionRepository.findAllByDueDateBefore(LocalDate.now());
        for (Subscription s : subscriptions) {
            LocalDate nextDueDate = nextPaymentDate(s.getStartDate(), s.getBilling());
            s.setDueDate(nextDueDate);
            subscriptionRepository.save(s);
        }
    }
}
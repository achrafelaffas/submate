package submate.email;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import submate.subscription.Subscription;
import submate.subscription.SubscriptionRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduledEmailService {
    private final SubscriptionRepository subscriptionRepository;
    private final List<ScheduledEmail> scheduledEmails = new ArrayList<>();
    private final EmailService emailService;

    @Scheduled(cron = "0 0 0 * * *")
    public void SendScheduledEmailService() throws MessagingException {
        setEmails();

        for (ScheduledEmail se : scheduledEmails) {
            emailService.SendRemindingEmail(
                    se.getTo(),
                    se.getUsername(),
                    se.getPlateform(),
                    se.getNextPaymentDate()
            );
        }
    }

    public void setEmails() {
        LocalDate today = LocalDate.now();
        List<Subscription> subscriptions = subscriptionRepository.findAllByDueDateAfter(today);
        for (Subscription subscription : subscriptions) {
            LocalDate dueDate = subscription.getDueDate();
            if (dueDate.isEqual(today.plusDays(7))) {
                ScheduledEmail scheduledEmail = ScheduledEmail.builder()
                        .plateform(subscription.getPlateform())
                        .nextPaymentDate(dueDate)
                        .to(subscription.getUser().getEmail())
                        .username(subscription.getUser().getUsername())
                        .build();
                scheduledEmails.add(scheduledEmail);
            }
        }
    }
}

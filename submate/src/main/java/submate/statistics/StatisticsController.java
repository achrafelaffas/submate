package submate.statistics;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import submate.payment.PaymentResponse;

import java.util.List;

@RestController
@RequestMapping("statistics")
@RequiredArgsConstructor
@Tag(name = "Statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping("/subs-count-per-category")
    public ResponseEntity<List<SubscriptionsPerCategory>> getSubsCountPerCategory(Authentication auth) {
        return ResponseEntity.ok(statisticsService.getSubscriptionsPerCategoryCount(auth));
    }

    @GetMapping("/get-recent-payments")
    public ResponseEntity<List<PaymentResponse>> getRecentPayments(Authentication auth) {
        return ResponseEntity.ok(statisticsService.getRecentPayments(auth));
    }

    @GetMapping("/expenses-per-category")
    public ResponseEntity<List<ExpensePerCategory>> getExpensesPerCategoryCount(Authentication auth) {
        return ResponseEntity.ok(statisticsService.getExpensesPerCategoryCount(auth));
    }

    @GetMapping("/get-subscription-stats")
    public ResponseEntity<SubscriptionStats> getSubscriptionStats(Authentication auth) {
        return ResponseEntity.ok(statisticsService.getSubscriptionStats(auth));
    }

    @GetMapping("/get-payments-total")
    public ResponseEntity<TotalExpenses> getPaymentsTotal(Authentication auth) {
        return ResponseEntity.ok(statisticsService.getPaymentsTotal(auth));
    }

    @GetMapping("/get-due-this-week")
    public ResponseEntity<UpcomingThisWeek> getDueThisWeek(Authentication auth) {
        return ResponseEntity.ok(statisticsService.getUpcomingWeekPayment(auth));
    }
}

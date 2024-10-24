package submate.payment;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import submate.statistics.ExpensePerCategory;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findBySubscriptionId(Long subscriptionId);

    List<Payment> findBySubscriptionUserIdOrderByIdDesc(Long userId, Pageable pageable);

    @Query("SELECT new submate.statistics.ExpensePerCategory((c.name), sum(p.price)) " +
            "FROM Payment p LEFT JOIN p.subscription s LEFT JOIN s.category c LEFT JOIN s.user u " +
            "WHERE u.id = :userId " +
            "GROUP BY c.name")
    List<ExpensePerCategory> countExpenseByCategory(@Param("userId") Long userId);

    @Query("SELECT SUM(p.price) FROM Payment p WHERE p.subscription.user.id = :userId")
    double sumPriceBySubscriptionUserId(@Param("userId") Long userId);
}

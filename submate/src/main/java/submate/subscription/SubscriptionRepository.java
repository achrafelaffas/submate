package submate.subscription;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import submate.statistics.SubscriptionsPerCategory;

import java.time.LocalDate;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findAllByUserId(Long userId);

    List<Subscription> findAllByDueDate(LocalDate now);

    List<Subscription> findAllByDueDateAfter(LocalDate now);

    List<Subscription> findAllByDueDateBefore(LocalDate now);

    @Query("SELECT new submate.statistics.SubscriptionsPerCategory((c.name), count(s.id)) " +
            "FROM Category c LEFT JOIN c.subscriptions s " +
            "WHERE s.user.id = :userId " +
            "GROUP BY c.name")
    List<SubscriptionsPerCategory> countSubscriptionByCategory(@Param("userId") Long userId);

    List<Subscription> findAllByCategoryId(Long categoryId);

    List<Subscription> countSubscriptionByCreatedDateAfter(LocalDate lastweek);
}
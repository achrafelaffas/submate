package submate.subscription;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import submate.category.Category;
import submate.common.BaseEntity;
import submate.payment.Payment;
import submate.user.User;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "subscriptions")
public class Subscription extends BaseEntity {

    private String plateform;
    @Enumerated
    private Billing billing;
    private double price;
    private LocalDate startDate;
    private String image;
    private LocalDate dueDate;

    @ManyToOne
    private Category category;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "subscription")
    private List<Payment> payments;
}
package submate.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String token;
    private LocalDateTime created;
    private LocalDateTime expires;
    private LocalDateTime verified;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

}

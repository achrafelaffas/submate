package submate.email;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class ScheduledEmail {
    private String to;
    private String username;
    private LocalDate nextPaymentDate;
    private String plateform;
}
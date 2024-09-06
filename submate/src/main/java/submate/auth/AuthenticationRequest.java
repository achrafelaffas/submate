package submate.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationRequest {
    @NotNull(message = "The email is required")
    @NotEmpty(message = "The email is required")
    @Email(message = "The email you provided is invalid")
    private String email;
    @NotNull(message = "The password is required")
    @NotEmpty(message = "The password is required")
    private String password;
}

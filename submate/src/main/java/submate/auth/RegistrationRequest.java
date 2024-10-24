package submate.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RegistrationRequest {
    @NotNull(message = "The first name is required")
    @NotEmpty(message = "The first name is required")
    private String firstname;
    @NotNull(message = "The last name is required")
    @NotEmpty(message = "The last name is required")
    private String lastname;
    @NotNull(message = "The email is required")
    @NotEmpty(message = "The email is required")
    @Email(message = "The email you provided is invalid")
    private String email;
    @NotNull(message = "The password is required")
    @NotEmpty(message = "The password is required")
    @Size(min = 8, message = "The password should have 8 characters minimum")
    private String password;
}

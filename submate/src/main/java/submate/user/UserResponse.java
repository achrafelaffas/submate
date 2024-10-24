package submate.user;

public record UserResponse(
        String email,
        String firstname,
        String lastname,
        Long id
) {
}

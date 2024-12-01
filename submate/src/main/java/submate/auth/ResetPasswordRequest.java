package submate.auth;

public record ResetPasswordRequest(
        String token,
        String password
) {
}

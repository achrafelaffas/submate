package submate.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponse toUserResponse(User user) {
        return new UserResponse(user.getEmail(), user.getFirstname(), user.getLastname(), user.getId());
    }

    public UserResponse getUserById(Long userId) {
        return userRepository.findById(userId).map(this::toUserResponse).orElseThrow();
    }
}

package submate.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {
    private final UserService userService;

    @GetMapping("{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}

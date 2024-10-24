package submate.subscription;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("subscriptions")
@RequiredArgsConstructor
@Tag(name = "Subscription")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<List<SubscriptionResponse>> getSubscriptions(Authentication auth) {
        return ResponseEntity.ok(subscriptionService.getSubscriptions(auth));
    }

    @GetMapping("{id}")
    public ResponseEntity<SubscriptionResponse> getSubscriptionById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionById(id));
    }

    @PostMapping
    public ResponseEntity<Void> createSubscription(
            @RequestBody @Valid SubscriptionRequest subscriptionRequest,
            Authentication auth
    ) {
        subscriptionService.createSubscription(subscriptionRequest, auth);
        return ResponseEntity.status(201).build();
    }

    @PutMapping
    public ResponseEntity<Void> updateSubscription(
            @RequestBody @Valid SubscriptionRequest subscriptionRequest,
            Authentication auth
    ) {
        subscriptionService.updateSubscription(subscriptionRequest, auth);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteSubscriptionById(@PathVariable("id") Long id) {
        subscriptionService.deleteSubscription(id);
        return ResponseEntity.noContent().build();
    }
}

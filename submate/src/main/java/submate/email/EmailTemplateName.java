package submate.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
    ACTIVATION_EMAIL("activation_email");
    private final String name;
    EmailTemplateName(String name) {
        this.name = name;
    }
}

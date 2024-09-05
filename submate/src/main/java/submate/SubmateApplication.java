package submate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import submate.role.RoleRepository;
import submate.role.Role;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditor")
public class SubmateApplication {
    public static void main(String[] args) {
        SpringApplication.run(SubmateApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByName("USER").isEmpty())
                roleRepository.save(Role.builder().name("USER").build());
        };
    }
}
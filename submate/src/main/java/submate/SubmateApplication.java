package submate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import submate.category.Category;
import submate.category.CategoryRepository;
import submate.role.RoleRepository;
import submate.role.Role;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditor")
@EnableScheduling
public class SubmateApplication {
    public static void main(String[] args) {
        SpringApplication.run(SubmateApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(RoleRepository roleRepository, CategoryRepository categoryRepository) {
        return args -> {
            if (roleRepository.findByName("USER").isEmpty())
                roleRepository.save(Role.builder().name("USER").build());

            if (categoryRepository.findByName("Entertainment & Streaming").isEmpty())
                categoryRepository.save(Category.builder().name("Entertainment & Streaming").build());

            if (categoryRepository.findByName("Education & Learning").isEmpty())
                categoryRepository.save(Category.builder().name("Education & Learning").build());

            if (categoryRepository.findByName("Productivity & Tools").isEmpty())
                categoryRepository.save(Category.builder().name("Productivity & Tools").build());

            if (categoryRepository.findByName("Software & Development").isEmpty())
                categoryRepository.save(Category.builder().name("Software & Development").build());

            if (categoryRepository.findByName("Software & Development").isEmpty())
                categoryRepository.save(Category.builder().name("Software & Development").build());

        };
    }
}
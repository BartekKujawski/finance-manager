package app;

import app.service.BudgetService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BudgetApplication {

    public static void main(String[] args) {
        SpringApplication.run(BudgetApplication.class, args);
    }

    @Bean
    public static CommandLineRunner init(BudgetService service) {
        return args -> {
            service.registerUser("1", "Tata", "admin123");
            service.registerUser("2", "Mama", "mama2024");
            service.registerUser("3", "Syn", "minecraft");
            service.registerUser("4", "Córka", "kotki");

            System.out.println("--> System initialized with 4 family members.");
        };
    }
}

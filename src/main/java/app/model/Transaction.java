package app.model;

import java.time.LocalDateTime;
import java.util.UUID;

public abstract class Transaction {
    private final String id;
    protected double amount;
    private String description;
    private final LocalDateTime date;
    private final User user; // Relacja: Transakcja należy do Użytkownika

    public Transaction(User user, double amount, String description) {
        this.id = UUID.randomUUID().toString();
        this.user = user;
        this.amount = amount;
        this.description = description;
        this.date = LocalDateTime.now();
    }

    public String getId() { return id; }
    public double getAmount() { return amount; }
    public String getDescription() { return description; }
    public LocalDateTime getDate() { return date; }
    public User getUser() { return user; }

    // Metoda abstrakcyjna
    public abstract String getType();
}

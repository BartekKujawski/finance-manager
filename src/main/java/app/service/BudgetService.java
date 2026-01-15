package app.service;

import app.enums.*;
import app.exception.BudgetException;
import app.model.*;
import app.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class BudgetService {

    private final TransactionRepository transactionRepository;
    private final List<User> users = new ArrayList<>(); // Lista userów w pamięci

    public BudgetService(TransactionRepository repository) {
        this.transactionRepository = repository;
    }

    public void registerUser(String id, String username, String password) {
        users.add(new User(id, username, password));
    }

    public User authenticate(String userId, String password) {
        return users.stream()
                .filter(u -> u.getId().equals(userId))
                .filter(u -> u.getPassword().equals(password))
                .findFirst()
                .orElseThrow(() -> new BudgetException("Invalid user ID or password"));
    }

    public List<User> getAllUsers() {
        return users;
    }

    public void addIncome(String userId, String password, double amount, String desc, IncomeCategory cat) {
        User user = authenticate(userId, password);
        if (amount <= 0) throw new BudgetException("Amount must be positive");
        transactionRepository.save(new Income(user, amount, desc, cat));
    }

    public void addExpense(String userId, String password, double amount, String desc, ExpenseCategory cat) {
        User user = authenticate(userId, password);
        if (amount <= 0) throw new BudgetException("Amount must be positive");

        // Wspólne saldo
        if (calculateGlobalBalance() < amount) {
            throw new BudgetException("Insufficient funds in family budget!");
        }
        transactionRepository.save(new Expense(user, amount, desc, cat));
    }

    public double calculateGlobalBalance() {
        return transactionRepository.findAll().stream()
                .mapToDouble(t -> {
                    if (t instanceof Income) return t.getAmount();
                    if (t instanceof Expense) return -t.getAmount();
                    return 0.0;
                })
                .sum();
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
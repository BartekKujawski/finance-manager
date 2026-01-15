package app.controller;

import app.enums.ExpenseCategory;
import app.enums.IncomeCategory;
import app.model.Transaction;
import app.model.User;
import app.service.BudgetService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:5173") // CORS dla Reacta
public class BudgetController {

    private final BudgetService service;

    public BudgetController(BudgetService service) {
        this.service = service;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/transactions")
    public List<Transaction> getTransactions() {
        return service.getAllTransactions();
    }

    @GetMapping("/balance")
    public Map<String, Double> getBalance() {
        return Map.of("currentBalance", service.calculateGlobalBalance());
    }

    @PostMapping("/income")
    public void addIncome(@RequestBody Map<String, Object> payload) {
        String userId = (String) payload.get("userId");
        String pass = (String) payload.get("password");
        double amount = Double.parseDouble(payload.get("amount").toString());
        String desc = (String) payload.get("description");
        IncomeCategory cat = IncomeCategory.valueOf((String) payload.get("category"));

        service.addIncome(userId, pass, amount, desc, cat);
    }

    @PostMapping("/expense")
    public void addExpense(@RequestBody Map<String, Object> payload) {
        String userId = (String) payload.get("userId");
        String pass = (String) payload.get("password");
        double amount = Double.parseDouble(payload.get("amount").toString());
        String desc = (String) payload.get("description");
        ExpenseCategory cat = ExpenseCategory.valueOf((String) payload.get("category"));

        service.addExpense(userId, pass, amount, desc, cat);
    }
}
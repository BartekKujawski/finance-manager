package app.model;

import app.enums.ExpenseCategory;

public class Expense extends Transaction {
    private ExpenseCategory category;

    public Expense(User user, double amount, String description, ExpenseCategory category) {
        super(user, amount, description);
        this.category = category;
    }

    @Override
    public String getType() {
        return "EXPENSE";
    }

    public ExpenseCategory getCategory() { return category; }
}

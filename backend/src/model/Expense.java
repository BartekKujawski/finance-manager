package model;

import java.util.Date;

public class Expense extends Transaction {
    private ExpenseCategory category;

    public Expense(double amount, Date date, String description, ExpenseCategory category) {
        super(amount, date, description);
        this.category = category;
    }

    @Override
    public String getSummary() {
        return "[WYDATEK] " + category + ": " + getAmount() + " zł";
    }
}

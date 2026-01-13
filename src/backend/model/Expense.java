package model;

import java.util.Date;

public class Expense extends Transaction {
    private ExpenseCategory category;

    public Expense(double amount, Date date, String desc, ExpenseCategory cat) {
        super(amount, date, desc);
        this.category = cat;
    }

    @Override
    public String getSummary() {
        return "[WYDATEK] " + category + ": " + getAmount() + " zł (" + getDescription() + ")";
    }
}

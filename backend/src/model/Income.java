package model;

import java.util.Date;

public class Income extends Transaction {
    private IncomeCategory category;

    public Income(double amount, Date date, String description, IncomeCategory category) {
        super(amount, date, description);
        this.category = category;
    }

    @Override
    public String getSummary() {
        return "[PRZYCHÓD] " + category + ": " + getAmount() + " zł";
    }
}

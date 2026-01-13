package model;

import java.util.Date;

public class Income extends Transaction {
    private IncomeCategory category;

    public Income(double amount, Date date, String desc, IncomeCategory cat) {
        super(amount, date, desc);
        this.category = cat;
    }

    @Override
    public String getSummary() {
        return "[PRZYCHÓD] " + category + ": " + getAmount() + " zł (" + getDescription() + ")";
    }
}

package app.model;

import app.enums.IncomeCategory;

public class Income extends Transaction {
    private IncomeCategory category;

    public Income(User user, double amount, String description, IncomeCategory category) {
        super(user, amount, description);
        this.category = category;
    }

    @Override
    public String getType() {
        return "INCOME";
    }

    public IncomeCategory getCategory() { return category; }
}

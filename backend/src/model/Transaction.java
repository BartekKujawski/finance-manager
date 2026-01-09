package model;

import java.util.Date;

public abstract class Transaction {
    private double amount; // Hermetyzacja
    private Date date;
    private String description;

    public Transaction(double amount, Date date, String description) {
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    public abstract String getSummary(); // Metoda abstrakcyjna

    public double getAmount() { return amount; }
    public Date getDate() { return date; }
}

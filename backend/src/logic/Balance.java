package logic;

import model.Income;
import model.Transaction;

import java.util.ArrayList;
import java.util.List;

public class Balance {
    private List<Transaction> transactions = new ArrayList<>();

    public void addTransaction(Transaction t) {
        transactions.add(t);
    }

    public double calculateTotal() {
        double total = 0;
        for (Transaction t : transactions) {
            if (t instanceof Income) total += t.getAmount();
            else total -= t.getAmount();
        }
        return total;
    }

    public List<Transaction> getTransactions() { return transactions; }
}

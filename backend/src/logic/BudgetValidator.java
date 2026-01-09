package logic;

import exceptions.BudgetException;

public class BudgetValidator {
    public static int totalChecks = 0; // Pole statyczne

    public static boolean validateAmount(double amount) throws BudgetException {
        totalChecks++;
        if (amount <= 0) {
            throw new BudgetException("Kwota musi być większa od zera!");
        }
        return true;
    }
} 

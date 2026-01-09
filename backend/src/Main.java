// Plik: Main.java
import exceptions.BudgetException;
import logic.Balance;
import logic.BudgetValidator;
import logic.Report;
import model.*;

import java.util.Date;

public class Main {
    public static void main(String[] args) {
        User user = new User("JanKowalski", "jan@przyklad.pl");
        Balance balance = new Balance();
        Report report = new Report();

        System.out.println("--- System Zarządzania Budżetem ---");

        try {
            // 1. Walidacja i dodawanie przychodu
            double incomeAmount = 5000.0;
            if (BudgetValidator.validateAmount(incomeAmount)) {
                Income salary = new Income(incomeAmount, new Date(), "Wypłata luty", IncomeCategory.SALARY);
                balance.addTransaction(salary);
            }

            // 2. Walidacja i dodawanie wydatku
            double expenseAmount = 150.50;
            if (BudgetValidator.validateAmount(expenseAmount)) {
                Expense groceries = new Expense(expenseAmount, new Date(), "Zakupy w markecie", ExpenseCategory.FOOD);
                balance.addTransaction(groceries);
            }

            // 3. Próba dodania błędnej kwoty (wywoła wyjątek)
            System.out.println("\nPróba dodania ujemnej kwoty...");
            BudgetValidator.validateAmount(-10.0);

        } catch (BudgetException e) {
            // Realizacja wymogu: Obsługa błędów
            System.err.println("BŁĄD SYSTEMU: " + e.getMessage());
        }

        // 4. Wyświetlanie podsumowania (Polimorfizm)
        System.out.println("\n--- Lista Transakcji ---");
        for (Transaction t : balance.getTransactions()) {
            System.out.println(t.getSummary()); // Wywołuje odpowiednią wersję metody z Income/Expense
        }

        System.out.println("\nAktualny stan konta: " + balance.calculateTotal() + " zł");
        System.out.println("Liczba wykonanych walidacji: " + BudgetValidator.totalChecks);

        // 5. Eksport raportu (Interfejs)
        report.exportToFile("raport_luty.txt");
    }
}
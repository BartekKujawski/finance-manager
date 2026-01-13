import exceptions.BudgetException;
import logic.*;
import model.*;
import java.util.Date;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        User testUser = new User("student", "pass123");

        System.out.println("=== SYSTEM ZARZĄDZANIA BUDŻETEM: LOGOWANIE ===");
        System.out.print("Użytkownik: ");
        String inputLogin = scanner.nextLine();
        System.out.print("Hasło: ");
        String inputPass = scanner.nextLine();

        if (!AuthService.login(inputLogin, inputPass, testUser)) {
            System.out.println("Dostęp zablokowany: Niepoprawne dane logowania.");
            return;
        }

        Balance userBalance = testUser.getBalance();
        System.out.println("\nWitaj, " + testUser.getUsername() + "! Twoje saldo zostało zainicjalizowane.");

        try {
            System.out.println("\n--- TEST 1: Dodawanie poprawnych transakcji ---");

            Income wyplata = new Income(4500.0, new Date(), "Wynagrodzenie styczeń", IncomeCategory.SALARY);
            userBalance.addTransaction(wyplata);
            System.out.println("Dodano: " + wyplata.getDescription());

            Expense czynsz = new Expense(1200.0, new Date(), "Czynsz za mieszkanie", ExpenseCategory.HOUSING);
            userBalance.addTransaction(czynsz);
            System.out.println("Dodano: " + czynsz.getDescription());

            System.out.println("\n--- TEST 2: Polimorfizm i podsumowanie ---");
            for (Transaction t : userBalance.getTransactions()) {
                System.out.println(t.getSummary());
            }
            System.out.println("Aktualny stan konta: " + userBalance.calculateTotal() + " zł");

            System.out.println("\n--- TEST 3: Walidacja i Obsługa Błędów ---");
            System.out.println("Próba dodania transakcji z kwotą 0...");
            Expense blad = new Expense(0.0, new Date(), "Błędny wydatek", ExpenseCategory.OTHER_EXPENSE);
            userBalance.addTransaction(blad);

        } catch (BudgetException e) {
            System.err.println("PRZECHWYCONO WYJĄTEK: " + e.getMessage());
        }

        System.out.println("\n--- TEST 4: Raportowanie i Interfejs ---");
        Report monthlyReport = new Report();

        monthlyReport.generateMonthlyReport(userBalance);

        monthlyReport.exportToFile("raport_finansowy.txt");

        System.out.println("\nStatystyki walidatora: Wykonano " + BudgetValidator.totalChecks + " sprawdzeń.");
        System.out.println("=== KONIEC TESTU ===");

        scanner.close();
    }
}
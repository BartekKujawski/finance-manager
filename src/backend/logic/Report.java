package logic;

import interfaces.DataExport;
import model.Balance;

import java.util.Date;

public class Report implements DataExport {
    private Date reportDate;

    public Report() {
        this.reportDate = new Date();
    }

    public void generateMonthlyReport(Balance b) {
        System.out.println("Raport z dnia: " + reportDate);
        System.out.println("Liczba transakcji: " + b.getTransactions().size());
        System.out.println("Suma końcowa: " + b.calculateTotal() + " zł");
    }

    @Override
    public void exportToFile(String path) {
        System.out.println("Eksportowanie danych do: " + path);
    }
}

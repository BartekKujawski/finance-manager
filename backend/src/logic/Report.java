package logic;

import interfaces.IDataExport;

import java.util.Date;

public class Report implements IDataExport {
    private Date reportDate;

    @Override
    public void exportToFile(String path) {
        System.out.println("Eksportowanie raportu do pliku: " + path);
    }

    public void generateMonthlyReport(Balance b) {
        System.out.println("Generowanie raportu...");
        // Logika generowania
    }
}

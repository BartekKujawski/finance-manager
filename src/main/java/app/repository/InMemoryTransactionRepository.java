package app.repository;

import app.model.Transaction;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryTransactionRepository implements TransactionRepository {

    private final Map<String, Transaction> database = new ConcurrentHashMap<>();

    @Override
    public void save(Transaction transaction) {
        database.put(transaction.getId(), transaction);
    }

    @Override
    public List<Transaction> findAll() {
        return new ArrayList<>(database.values());
    }
}

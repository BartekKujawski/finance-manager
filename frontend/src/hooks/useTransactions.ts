import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import type { Transaction } from '../types';

export const useTransactions = () => {
    const { apiGet, loading, error } = useApi();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchTransactions = async () => {
        const data = await apiGet<Transaction[]>('/transactions');
        if (data && Array.isArray(data)) {
            setTransactions(data);
        } else if (data === null || data === undefined) {
            // Jeśli błąd, nie aktualizujemy - error jest już w stanie
        } else {
            // Jeśli nie jest tablicą, ustawiamy pustą tablicę
            setTransactions([]);
        }
    };

    useEffect(() => {
        fetchTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { transactions, loading, error, refetch: fetchTransactions };
};

import { useState } from 'react';
import { useApi } from './useApi';
import type { AddIncomeDto, AddExpenseDto } from '../types';

export const useAddTransaction = () => {
    const { apiPost, loading, error } = useApi();
    const [success, setSuccess] = useState(false);

    const addIncome = async (data: AddIncomeDto) => {
        setSuccess(false);
        const result = await apiPost<void, AddIncomeDto>('/income', data);
        if (result !== null) {
            setSuccess(true);
            return true;
        }
        return false;
    };

    const addExpense = async (data: AddExpenseDto) => {
        setSuccess(false);
        const result = await apiPost<void, AddExpenseDto>('/expense', data);
        if (result !== null) {
            setSuccess(true);
            return true;
        }
        return false;
    };

    return { addIncome, addExpense, loading, error, success };
};

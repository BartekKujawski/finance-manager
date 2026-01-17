import { useState, useMemo } from 'react';
import type { Transaction } from '../types';

type TransactionListProps = {
    transactions: Transaction[];
    loading: boolean;
    error: string;
};

export const TransactionList = ({
    transactions,
    loading,
    error,
}: TransactionListProps) => {
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [filterUser, setFilterUser] = useState<string>('');

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const matchesCategory =
                !filterCategory || transaction.category === filterCategory;
            const matchesUser =
                !filterUser || transaction.user.id === filterUser;

            return matchesCategory && matchesUser;
        });
    }, [transactions, filterCategory, filterUser]);

    const uniqueCategories = useMemo(() => {
        const categories = new Set<string>();
        transactions.forEach((t) => {
            if (t.category) categories.add(t.category);
        });
        return Array.from(categories).sort();
    }, [transactions]);

    const uniqueUsers = useMemo(() => {
        const users = new Set<{ id: string; username: string }>();
        transactions.forEach((t) => {
            users.add({ id: t.user.id, username: t.user.username });
        });
        return Array.from(users);
    }, [transactions]);

    if (loading) {
        return (
            <div className='bg-white rounded-lg shadow-md p-6'>
                <p className='text-gray-600'>Ładowanie transakcji...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-white rounded-lg shadow-md p-6'>
                <p className='text-red-600'>Błąd: {error}</p>
            </div>
        );
    }

    return (
        <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
                Lista transakcji
            </h2>

            <div className='mb-4 flex gap-4 flex-wrap'>
                <div className='flex-1 min-w-[200px]'>
                    <label
                        htmlFor='filter-category'
                        className='block text-sm font-medium text-gray-700 mb-2'
                    >
                        Filtruj po kategorii
                    </label>
                    <select
                        id='filter-category'
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value=''>Wszystkie kategorie</option>
                        {uniqueCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex-1 min-w-[200px]'>
                    <label
                        htmlFor='filter-user'
                        className='block text-sm font-medium text-gray-700 mb-2'
                    >
                        Filtruj po użytkowniku
                    </label>
                    <select
                        id='filter-user'
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value=''>Wszyscy użytkownicy</option>
                        {uniqueUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredTransactions.length === 0 ? (
                <p className='text-gray-600'>Brak transakcji do wyświetlenia</p>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Data
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Typ
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Użytkownik
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Kategoria
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Opis
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Kwota
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {filteredTransactions.map((transaction) => {
                                let date: Date;
                                try {
                                    date = new Date(transaction.date);
                                    if (isNaN(date.getTime())) {
                                        date = new Date();
                                    }
                                } catch {
                                    date = new Date();
                                }
                                const isIncome = transaction.type === 'INCOME';
                                return (
                                    <tr
                                        key={transaction.id}
                                        className='hover:bg-gray-50'
                                    >
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {date.toLocaleDateString('pl-PL')}{' '}
                                            {date.toLocaleTimeString('pl-PL', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    isIncome
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {isIncome
                                                    ? 'PRZYCHÓD'
                                                    : 'WYDATEK'}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {transaction.user.username}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {transaction.category || '-'}
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray-900'>
                                            {transaction.description}
                                        </td>
                                        <td
                                            className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                                                isIncome
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {isIncome ? '+' : '-'}
                                            {transaction.amount.toFixed(2)} PLN
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

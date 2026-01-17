import { useState, type FormEvent } from 'react';
import { useAddTransaction } from '../hooks/useAddTransaction';
import type { User, ExpenseCategory, IncomeCategory } from '../types';

type TransactionFormProps = {
    user: User;
    password: string;
    onTransactionAdded?: () => void;
};

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
    'HOUSING',
    'FOOD',
    'TRANSPORT',
    'HEALTH',
    'EDUCATION',
    'ENTERTAINMENT',
    'SHOPPING',
    'INSURANCE',
    'DEBT_PAYMENT',
    'PERSONAL_CARE',
    'TRAVEL',
    'OTHER_EXPENSE',
];

const INCOME_CATEGORIES: IncomeCategory[] = [
    'SALARY',
    'BUSINESS',
    'INVESTMENT',
    'RENTAL',
    'GIFT',
    'BENEFIT',
    'SALE',
    'OTHER_INCOME',
];

export const TransactionForm = ({
    user,
    password,
    onTransactionAdded,
}: TransactionFormProps) => {
    const { addIncome, addExpense, loading, error, success } =
        useAddTransaction();
    const [transactionType, setTransactionType] = useState<
        'INCOME' | 'EXPENSE'
    >('INCOME');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<ExpenseCategory | IncomeCategory>(
        'SALARY'
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            return;
        }

        const success =
            transactionType === 'INCOME'
                ? await addIncome({
                      userId: user.id,
                      password,
                      amount: amountNum,
                      description,
                      category: category as IncomeCategory,
                  })
                : await addExpense({
                      userId: user.id,
                      password,
                      amount: amountNum,
                      description,
                      category: category as ExpenseCategory,
                  });

        if (success) {
            setAmount('');
            setDescription('');
            if (onTransactionAdded) {
                // Małe opóźnienie, aby backend zdążył zapisać transakcję
                onTransactionAdded();
            }
        }
    };

    return (
        <div className='rounded-lg border border-gray-200 p-4'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
                Dodaj transakcję
            </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Typ transakcji
                    </label>
                    <div className='flex gap-4'>
                        <label className='flex items-center'>
                            <input
                                type='radio'
                                value='INCOME'
                                checked={transactionType === 'INCOME'}
                                onChange={(e) => {
                                    setTransactionType(
                                        e.target.value as 'INCOME'
                                    );
                                    setCategory('SALARY');
                                }}
                                className='mr-2'
                            />
                            <span>Przychód</span>
                        </label>
                        <label className='flex items-center'>
                            <input
                                type='radio'
                                value='EXPENSE'
                                checked={transactionType === 'EXPENSE'}
                                onChange={(e) => {
                                    setTransactionType(
                                        e.target.value as 'EXPENSE'
                                    );
                                    setCategory('HOUSING');
                                }}
                                className='mr-2'
                            />
                            <span>Wydatek</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label
                        htmlFor='category'
                        className='block text-sm font-medium text-gray-700 mb-2'
                    >
                        Kategoria
                    </label>
                    <select
                        id='category'
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value as
                                    | ExpenseCategory
                                    | IncomeCategory
                            )
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        {transactionType === 'INCOME'
                            ? INCOME_CATEGORIES.map((cat) => (
                                  <option key={cat} value={cat}>
                                      {cat}
                                  </option>
                              ))
                            : EXPENSE_CATEGORIES.map((cat) => (
                                  <option key={cat} value={cat}>
                                      {cat}
                                  </option>
                              ))}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor='amount'
                        className='block text-sm font-medium text-gray-700 mb-2'
                    >
                        Kwota
                    </label>
                    <input
                        type='number'
                        id='amount'
                        step='0.01'
                        min='0.01'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='0.00'
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='description'
                        className='block text-sm font-medium text-gray-700 mb-2'
                    >
                        Opis
                    </label>
                    <input
                        type='text'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Opis transakcji'
                        required
                    />
                </div>
                {error && <p className='text-red-600 text-sm'>{error}</p>}
                {success && (
                    <p className='text-green-600 text-sm'>
                        Transakcja dodana pomyślnie!
                    </p>
                )}
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition'
                >
                    {loading ? 'Dodawanie...' : 'Dodaj transakcję'}
                </button>
            </form>
        </div>
    );
};

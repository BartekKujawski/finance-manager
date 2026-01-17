import type { Balance } from '../types';

type BalanceDisplayProps = {
    balance: Balance | null;
    loading: boolean;
    error: string;
};

export const BalanceDisplay = ({
    balance,
    loading,
    error,
}: BalanceDisplayProps) => {
    if (loading) {
        return (
            <div className='rounded-lg border border-gray-200 p-4'>
                <p className='text-gray-600'>Ładowanie salda...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='rounded-lg border border-gray-200 p-4'>
                <p className='text-red-600'>Błąd: {error}</p>
            </div>
        );
    }

    const currentBalance = balance?.currentBalance ?? 0;
    const isPositive = currentBalance >= 0;

    return (
        <div className='rounded-lg border border-gray-200 p-4'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Saldo</h2>
            <div
                className={`text-3xl font-bold ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                }`}
            >
                {currentBalance.toFixed(2)} PLN
            </div>
        </div>
    );
};

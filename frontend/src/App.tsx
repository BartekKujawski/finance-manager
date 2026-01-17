import { useState } from 'react';
import { Login } from './components/Login';
import { BalanceDisplay } from './components/BalanceDisplay';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { useTransactions } from './hooks/useTransactions';
import { useBalance } from './hooks/useBalance';
import type { User } from './types';

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [password, setPassword] = useState('');
    const { transactions, loading, error, refetch: refetchTransactions } = useTransactions();
    const { balance, loading: balanceLoading, error: balanceError, refetch: refetchBalance } = useBalance();

    const handleLogin = (user: User, pwd: string) => {
        setLoggedInUser(user);
        setPassword(pwd);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        setPassword('');
    };

    return (
        <div className='min-h-screen bg-gray-100'>
            <header className='bg-white shadow-sm border-b border-gray-200'>
                <div className='container mx-auto px-4 py-4'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold text-gray-800'>
                            Finance Manager
                        </h1>
                        {loggedInUser && (
                            <div className='flex items-center gap-4'>
                                <p className='text-gray-600'>
                                    Zalogowany jako:{' '}
                                    <span className='font-semibold'>
                                        {loggedInUser.username}
                                    </span>
                                </p>
                                <button
                                    onClick={handleLogout}
                                    className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
                                >
                                    Wyloguj
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {!loggedInUser ? (
                <div className='container mx-auto px-4 py-8'>
                    <Login onLogin={handleLogin} />
                </div>
            ) : (
                <div className='flex h-[calc(100vh-73px)]'>
                    <aside className='w-80 bg-white border-r border-gray-200 overflow-y-auto p-6 space-y-6'>
                        <BalanceDisplay
                            balance={balance}
                            loading={balanceLoading}
                            error={balanceError}
                        />
                        <TransactionForm
                            user={loggedInUser}
                            password={password}
                            onTransactionAdded={() => {
                                setTimeout(() => {
                                    refetchBalance();
                                    refetchTransactions();
                                }, 200);
                            }}
                        />
                    </aside>
                    <main className='flex-1 overflow-y-auto p-6'>
                        <TransactionList
                            transactions={transactions}
                            loading={loading}
                            error={error}
                        />
                    </main>
                </div>
            )}
        </div>
    );
}

export default App;

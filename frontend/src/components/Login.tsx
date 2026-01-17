import { useState, type FormEvent } from 'react';
import { useUsers } from '../hooks/useUsers';
import type { User } from '../types';

type LoginProps = {
    onLogin: (user: User, password: string) => void;
};

export const Login = ({ onLogin }: LoginProps) => {
    const { users, loading } = useUsers();
    const [selectedUserId, setSelectedUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!selectedUserId || !password) {
            setError('Wybierz użytkownika i wprowadź hasło');
            return;
        }

        const user = users.find((u) => u.id === selectedUserId);
        if (user && user.password === password) {
            onLogin(user, password);
            setPassword('');
        } else {
            setError('Nieprawidłowe hasło');
        }
    };

    if (loading) {
        return <p className="text-gray-600">Ładowanie użytkowników...</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Logowanie</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-2">
                        Użytkownik
                    </label>
                    <select
                        id="user"
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Wybierz użytkownika</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Hasło
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Wprowadź hasło"
                    />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                    Zaloguj
                </button>
            </form>
        </div>
    );
};

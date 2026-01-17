import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import type { User } from '../types';

export const useUsers = () => {
    const { apiGet, loading, error } = useApi();
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const data = await apiGet<User[]>('/users');
        if (data) {
            setUsers(data);
        }
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { users, loading, error, refetch: fetchUsers };
};

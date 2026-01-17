import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import type { Balance } from '../types';

export const useBalance = () => {
    const { apiGet, loading, error } = useApi();
    const [balance, setBalance] = useState<Balance | null>(null);

    const fetchBalance = async () => {
        const data = await apiGet<Balance>('/balance');
        if (data) {
            setBalance(data);
        }
    };

    useEffect(() => {
        fetchBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { balance, loading, error, refetch: fetchBalance };
};

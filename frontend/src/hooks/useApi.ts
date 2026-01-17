import { useState } from 'react';

const API_BASE = 'http://localhost:8080/api/budget';

export const useApi = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const call = async <R, P = void>(
        url: string,
        method: 'GET' | 'DELETE' | 'POST',
        body?: P
    ) => {
        setLoading(true);
        setError('');

        const commonData = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };

        const reqData = body
            ? { ...commonData, body: JSON.stringify(body) }
            : commonData;

        try {
            const response = await fetch(`${API_BASE}${url}`, reqData);

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                const hasBody = response.headers.get('content-length') !== '0';
                
                if (contentType && contentType.includes('application/json') && hasBody) {
                    const text = await response.text();
                    if (text && text.trim()) {
                        try {
                            const data: R = JSON.parse(text);
                            return data;
                        } catch (parseError) {
                            console.log('JSON parse error', parseError);
                            return {} as R;
                        }
                    }
                }
                return {} as R;
            } else {
                let apiError = 'Wystąpił błąd';
                try {
                    const errorText = await response.text();
                    if (errorText && errorText.trim()) {
                        apiError = errorText;
                    }
                } catch {
                    // Ignore error reading error response
                }
                setError(apiError);
                return null;
            }
        } catch (e) {
            console.log('Error', e);
            setError('Wystąpił błąd');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const apiGet = async <R>(url: string) => {
        return await call<R>(url, 'GET');
    };

    const apiDelete = async <R>(url: string) => {
        return await call<R>(url, 'DELETE');
    };

    const apiPost = async <R, P>(url: string, data: P) => {
        return await call<R, P>(url, 'POST', data);
    };

    return {
        apiGet,
        apiDelete,
        apiPost,
        loading,
        error,
    };
};

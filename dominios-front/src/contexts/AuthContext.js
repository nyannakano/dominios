'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        isLoading: true
    });

    const router = useRouter();

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (token) {
                await axios.get('http://localhost:8000/api/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAuthState({ isLoggedIn: true, isLoading: false });
            } else {
                setAuthState({ isLoggedIn: false, isLoading: false });
            }
        } catch (error) {
            setAuthState({ isLoggedIn: false, isLoading: false });
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = (token) => {
        localStorage.setItem('auth_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({ isLoggedIn: true, isLoading: false });
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (token) {
                await axios.post('http://localhost:8000/api/logout', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        } finally {
            localStorage.removeItem('auth_token');
            delete axios.defaults.headers.common['Authorization'];
            setAuthState({ isLoggedIn: false, isLoading: false });
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
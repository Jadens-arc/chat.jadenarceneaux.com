import {
    useState,
    useEffect,
    createContext,
    useContext,
    useLayoutEffect,
} from 'react';

import api from '@/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return; 
            try {
                await api.get('/auth/me');
            } catch (error) {
                setToken(null);
                localStorage.removeItem('token');
            }
        };
        fetchUser();
    }, [token]);

    useLayoutEffect(() => {
        const interceptor = api.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        return () => {
            api.interceptors.request.eject(interceptor);
        };
    }, [token]);

    useEffect(() => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

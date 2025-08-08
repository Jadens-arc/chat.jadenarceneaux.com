import {
    useState,
    useEffect,
    createContext,
    useContext,
    useLayoutEffect,
} from 'react';

import api from '@/lib/api';

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
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return; 
            try {
                let data = (await api.get('/auth/me')).data;
                setUser(data.user);
            } catch (error) {
                console.log('Failed to fetch user:', error);
                setToken(null);
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
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

    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

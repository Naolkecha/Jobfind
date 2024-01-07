import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading set to true initially
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                return;
            }

            const response = await api.getUser({ headers: { Authorization: `Bearer ${token}` } });
            setUser(response);
            setIsAuthenticated(true);
        } catch (err) {
            console.error('Error verifying token or fetching user:', err);
            logout(); // Clear invalid token and user state
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await api.login(credentials);
            const { token, user } = response;
            localStorage.setItem('token', token); // Save token to localStorage
            setUser(user);
            setIsAuthenticated(true);
        } catch (err) {
            console.error('Login failed:', err);
        } finally {
            setLoading(false);
        }
    };

    // islogged in based on token availability
    const isLoggeIn = () => {
        return !!localStorage.getItem('token');
    };



    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    // useEffect(() => {
    //     fetchUser(); // Check token and fetch user on app load
    // }, []);

    return (
        <UserContext.Provider value={{ user, isLoggeIn, setUser, login, logout, loading, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Configure axios to always send credentials (cookies)
    axios.defaults.withCredentials = true;

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/auth/me');
            setUser(data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setError(null);
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setUser(data);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
            throw new Error(message);
        }
    };

    const register = async (name, email, password) => {
        setError(null);
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            setUser(data);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            throw new Error(message);
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            setUser(null);
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    // Forgot Password
    const forgotPassword = async (email) => {
        const res = await axios.post('http://localhost:5000/api/auth/forgotpassword', { email });
        return res.data;
    };

    // Reset Password
    const resetPassword = async (resetToken, password) => {
        const res = await axios.put(`http://localhost:5000/api/auth/resetpassword/${resetToken}`, { password });
        setUser(res.data);
        return res.data;
    };

    // Update Password
    const updatePassword = async (currentPassword, newPassword) => {
        const res = await axios.put('http://localhost:5000/api/auth/updatepassword', { currentPassword, newPassword });
        setUser(res.data);
        return res.data;
    };

    // Update Details
    const updateDetails = async (name, email) => {
        const res = await axios.put('http://localhost:5000/api/auth/updatedetails', { name, email });
        setUser(res.data);
        return res.data;
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            register,
            logout,
            checkAuth,
            forgotPassword,
            resetPassword,
            updatePassword,
            updateDetails
        }}>
            {children}
        </AuthContext.Provider>
    );
};

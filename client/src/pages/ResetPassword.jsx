import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetToken } = useParams(); // Should be lowercase 'resettoken' if route is so, but conventionally camelCase in React router params.
    // Wait, in route definition it was :resettoken (lowercase).
    // In React Router, it matches the route param name. I'll need to double check the App.jsx definition I'm about to make.

    // Assuming I will name it 'resetToken' in App.jsx

    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);

        try {
            await resetPassword(resetToken, password);
            navigate('/login'); // Or dashboard, since resetPassword logs user in
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-sage-light/10 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md w-full">
                <h2 className="text-3xl font-serif text-sage-deep mb-6 text-center">Reset Password</h2>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-light focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            minLength="6"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-light focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <Button type="submit" className="w-full justify-center" disabled={loading}>
                        {loading ? 'Resetting...' : 'Set New Password'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

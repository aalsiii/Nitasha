import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/ui/Button';
import AvailabilityManager from '../components/features/admin/AvailabilityManager';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [view, setView] = useState('list'); // list, create, edit, availability
    const [currentBlog, setCurrentBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: 'Dr. Nitasha Buldeo',
        category: 'General',
        coverImage: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Hardcoded password for simple protection as requested
    const ADMIN_PASSWORD = "admin";

    useEffect(() => {
        if (isAuthenticated) {
            fetchBlogs();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/blogs');
            setBlogs(res.data);
        } catch (err) {
            console.error("Failed to fetch blogs", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, coverImage: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        data.append('author', formData.author);
        data.append('category', formData.category);
        if (formData.coverImage) {
            if (formData.coverImage instanceof File) {
                data.append('coverImage', formData.coverImage);
            }
        }

        try {
            if (view === 'create') {
                await axios.post('http://localhost:5000/api/admin/blogs', data);
            } else if (view === 'edit' && currentBlog) {
                await axios.put(`http://localhost:5000/api/admin/blogs/${currentBlog._id}`, data);
            }
            fetchBlogs();
            setView('list');
            resetForm();
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || err.message || 'Failed to save blog';
            setError(`Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (blog) => {
        setCurrentBlog(blog);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author,
            category: blog.category,
            coverImage: blog.coverImage
        });
        setView('edit');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/blogs/${id}`);
                fetchBlogs();
            } catch (err) {
                console.error(err);
                setError('Failed to delete blog');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            author: 'Dr. Nitasha Buldeo',
            category: 'General',
            coverImage: null
        });
        setCurrentBlog(null);
    };

    if (!isAuthenticated) {
        return (
            <div className="pt-40 pb-20 container mx-auto px-6 flex justify-center">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md w-full">
                    <h2 className="text-2xl font-serif text-sage-deep mb-6 text-center">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-light focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" className="w-full justify-center">Login</Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif text-sage-deep">Admin Dashboard</h1>
                <div className="flex gap-3">
                    {view !== 'list' && (
                        <Button onClick={() => setView('list')} variant="outline">Back to Blogs</Button>
                    )}
                    {view === 'list' && (
                        <>
                            <Button onClick={() => setView('availability')} variant="secondary">Manage Availability</Button>
                            <Button onClick={() => { setView('create'); resetForm(); }}>Create New Blog</Button>
                        </>
                    )}
                </div>
            </div>

            {view === 'availability' && <AvailabilityManager />}

            {view === 'list' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-sage-light/10">
                        <h2 className="font-serif text-xl text-sage-deep">Blog Posts</h2>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-sage-light/20 text-sage-deep uppercase text-xs font-semibold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Author</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {blogs.map(blog => (
                                <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{blog.title}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{blog.author}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="text-terracotta-medium hover:text-terracotta-dark font-medium text-sm transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="text-red-400 hover:text-red-600 font-medium text-sm transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {blogs.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No blogs found. Create one!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {(view === 'create' || view === 'edit') && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-serif text-sage-deep mb-6">{view === 'create' ? 'Create New Post' : 'Edit Post'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-light focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-light focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleInputChange}
                                required
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-light focus:border-transparent outline-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content (Reference: Use HTML tags for formatting)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                required
                                rows="12"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-light focus:border-transparent outline-none font-mono text-sm"
                            ></textarea>
                            <p className="text-xs text-gray-500 mt-1">Tip: You can use &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;strong&gt; etc. for formatting.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-sage-light/20 file:text-sage-deep
                            hover:file:bg-sage-light/30"
                            />
                            {formData.coverImage && !(formData.coverImage instanceof File) && (
                                <p className="text-xs text-gray-500 mt-2">Current image: {formData.coverImage}</p>
                            )}
                        </div>

                        {error && <p className="text-red-500 text-sm text-right">{error}</p>}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={() => setView('list')}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Saving...' : (view === 'create' ? 'Publish Post' : 'Save Changes')}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Admin;

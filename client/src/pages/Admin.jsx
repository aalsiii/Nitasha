import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    FileText, User, PenTool, Link as LinkIcon, Tags, List, Image as ImageIcon, Layout,
    Bold, Italic, Underline, ListOrdered, Quote, Minus, Eraser, Heading1, Heading2, Heading3
} from 'lucide-react';
import Button from '../components/ui/Button';
import AvailabilityManager from '../components/features/admin/AvailabilityManager';

const ToolbarButton = ({ command, value, icon: Icon, label, title }) => (
    <button
        type="button"
        onMouseDown={(e) => {
            e.preventDefault(); // Prevent losing focus
            document.execCommand(command, false, value);
        }}
        className="p-1.5 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-100 hover:text-sage-deep transition-colors"
        title={title}
    >
        {Icon ? <Icon className="w-4 h-4" /> : label}
    </button>
);

const WysiwygEditor = ({ initialContent = '', onChange }) => {
    const editorRef = useRef(null);
    const isInternalUpdate = useRef(false);

    useEffect(() => {
        if (editorRef.current && !isInternalUpdate.current) {
            editorRef.current.innerHTML = initialContent;
        }
        isInternalUpdate.current = false;
    }, [initialContent]);

    const handleInput = (e) => {
        isInternalUpdate.current = true;
        if (onChange) {
            onChange(e.currentTarget.innerHTML);
        }
    };

    return (
        <div>
            {/* Editor Toolbar */}
            {/* Editor Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-gray-200 rounded-t-lg items-center sticky top-0 z-10 border-b-0">
                <ToolbarButton command="formatBlock" value="h1" icon={Heading1} title="Heading 1" />
                <ToolbarButton command="formatBlock" value="h2" icon={Heading2} title="Heading 2" />
                <ToolbarButton command="formatBlock" value="h3" icon={Heading3} title="Heading 3" />
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <ToolbarButton command="bold" icon={Bold} title="Bold" />
                <ToolbarButton command="italic" icon={Italic} title="Italic" />
                <ToolbarButton command="underline" icon={Underline} title="Underline" />
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <ToolbarButton command="insertUnorderedList" icon={List} title="Bullet List" />
                <ToolbarButton command="insertOrderedList" icon={ListOrdered} title="Numbered List" />
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <ToolbarButton command="formatBlock" value="blockquote" icon={Quote} title="Quote" />
                <ToolbarButton command="insertHorizontalRule" icon={Minus} title="Divider" />
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        const url = prompt('Enter URL:');
                        if (url) document.execCommand('createLink', false, url);
                    }}
                    className="p-1.5 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-100 hover:text-sage-deep transition-colors"
                    title="Link"
                >
                    <LinkIcon className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        document.execCommand('removeFormat', false, null);
                    }}
                    className="p-1.5 bg-white border border-gray-200 rounded text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors ml-auto"
                    title="Clear Formatting"
                >
                    <Eraser className="w-4 h-4" />
                </button>
            </div>

            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onBlur={handleInput}
                className="w-full px-4 py-4 border border-gray-300 rounded-b-lg focus:ring-2 focus:ring-sage-light focus:border-transparent outline-none min-h-[400px] prose prose-sage max-w-none shadow-inner bg-white overflow-y-auto"
                style={{ whiteSpace: 'pre-wrap' }}
            ></div>
            <p className="text-xs text-gray-500 mt-1">Start typing... Highlight text to format.</p>
        </div>
    );
};

const CATEGORIES = [
    "Acupuncture",
    "Ayurveda",
    "Facial Acupuncture",
    "Homeopathy",
    "Hypnotherapy",
    "Marmapuncture",
    "Natural Medicine",
    "Nutritional Healing",
    "Plant Medicine",
    "Transpersonal Psychotherapy",
    "Yoga Therapy"
];

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [view, setView] = useState('list'); // list, create, edit, availability
    const [currentBlog, setCurrentBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Dr. Nitasha Buldeo',
        category: [],
        tags: '',
        coverImage: null
    });
    // ... (keep referencing other parts if needed, but here I'll just target the specific changes)

    const toggleCategory = (category) => {
        setFormData(prev => {
            const currentCategories = Array.isArray(prev.category) ? prev.category : [];
            if (currentCategories.includes(category)) {
                return { ...prev, category: currentCategories.filter(c => c !== category) };
            } else {
                return { ...prev, category: [...currentCategories, category] };
            }
        });
    };



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

        if (name === 'title') {
            const generatedSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, title: value, slug: generatedSlug }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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
        data.append('slug', formData.slug); // Send manual or generated slug
        data.append('tags', formData.tags); // Send tags string
        if (Array.isArray(formData.category)) {
            formData.category.forEach(cat => data.append('category', cat));
        } else {
            data.append('category', formData.category);
        }
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
            slug: blog.slug || '',
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author,
            category: blog.category,
            tags: blog.tags ? blog.tags.join(', ') : '',
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-3xl font-serif text-sage-deep">Admin Dashboard</h1>
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {view !== 'list' && (
                        <Button onClick={() => setView('list')} variant="outline">Back to Blogs</Button>
                    )}
                    {view === 'list' && (
                        <>
                            <Button onClick={() => setView('availability')} variant="primary">Manage Availability</Button>
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
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
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
                </div>
            )}

            {(view === 'create' || view === 'edit') && (
                <div className="max-w-5xl mx-auto">
                    {/* Header Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-terracotta-medium px-6 py-4 flex items-center gap-2 text-white">
                            <FileText className="w-5 h-5" />
                            <h2 className="text-lg font-medium tracking-wide">Article Information</h2>
                        </div>

                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Top Row: Author & Title */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            Author Name
                                        </label>
                                        <input
                                            type="text"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terracotta-light focus:border-terracotta-medium outline-none transition-all text-gray-700 bg-gray-50/50"
                                            placeholder="Enter author name"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <PenTool className="w-4 h-4 text-gray-400" />
                                            Article Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terracotta-light focus:border-terracotta-medium outline-none transition-all text-gray-700"
                                            placeholder="Enter article title"
                                        />
                                    </div>
                                </div>

                                {/* URL Slug */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <LinkIcon className="w-4 h-4 text-gray-400" />
                                        URL Slug <span className="text-gray-400 font-normal text-xs">(auto-generated)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 font-mono text-sm focus:ring-2 focus:ring-terracotta-light outline-none"
                                    />
                                    <p className="mt-1.5 text-xs text-terracotta-medium flex items-center gap-1">
                                        <span className="font-bold">URL:</span> /resources/blogs/{formData.slug || 'your-slug-here'}
                                    </p>
                                </div>

                                {/* Categories & Tags */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <List className="w-4 h-4 text-gray-400" />
                                            Categories
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={Array.isArray(formData.category) ? formData.category.join(', ') : ''}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 mb-3"
                                            placeholder="Select below..."
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            {CATEGORIES.map(cat => {
                                                const isSelected = Array.isArray(formData.category) && formData.category.includes(cat);
                                                return (
                                                    <button
                                                        key={cat}
                                                        type="button"
                                                        onClick={() => toggleCategory(cat)}
                                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${isSelected
                                                            ? 'bg-sage-deep/10 text-sage-deep border-sage-deep'
                                                            : 'bg-white text-gray-500 border-gray-200 hover:border-sage-light hover:text-sage-deep'
                                                            }`}
                                                    >
                                                        {cat}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Tags className="w-4 h-4 text-gray-400" />
                                            Tags
                                        </label>
                                        <input
                                            type="text"
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terracotta-light focus:border-terracotta-medium outline-none transition-all text-gray-700"
                                            placeholder="e.g. Holistic Health, Stress Relief, Gut Health, Meditation (comma separated)"
                                        />
                                        <p className="mt-1.5 text-xs text-gray-400">Comma-separated</p>
                                    </div>
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Layout className="w-4 h-4 text-gray-400" />
                                        Excerpt
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terracotta-light focus:border-terracotta-medium outline-none transition-all text-gray-700"
                                        placeholder="Short summary for the blog list..."
                                    ></textarea>
                                </div>

                                {/* Content */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        Content
                                    </label>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <WysiwygEditor
                                            initialContent={formData.content}
                                            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                                        />
                                    </div>
                                </div>

                                {/* Cover Image */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <ImageIcon className="w-4 h-4 text-gray-400" />
                                        Cover Image
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                                            </div>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                    {formData.coverImage && !(formData.coverImage instanceof File) && (
                                        <p className="text-xs text-gray-500 mt-2 text-center">Current: {formData.coverImage}</p>
                                    )}
                                    {formData.coverImage && (formData.coverImage instanceof File) && (
                                        <p className="text-xs text-green-600 mt-2 text-center">New file selected: {formData.coverImage.name}</p>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                                    <Button type="button" variant="outline" onClick={() => setView('list')}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 'Processing...' : (view === 'create' ? 'Publish Post' : 'Save Changes')}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;

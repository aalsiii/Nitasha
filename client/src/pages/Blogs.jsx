import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/ui/Button';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Assuming dev environment URL, in prod usage relative path if proxy setup or Env var
                const res = await axios.get('http://localhost:5000/api/blogs');
                setBlogs(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            <h1 className="text-4xl font-serif text-sage-deep mb-8 text-center">Our Blogs</h1>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading articles...</div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20 text-gray-500">No articles found. Check back soon!</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <div key={blog._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-gray-100">
                            {blog.coverImage && (
                                <div className="h-48 overflow-hidden">
                                    {/* Handle both local uploads and potential external URLs */}
                                    <img
                                        src={blog.coverImage.startsWith('http') ? blog.coverImage : `http://localhost:5000/${blog.coverImage}`}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-semibold text-terracotta-dark uppercase tracking-wider">{blog.category}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h2 className="text-xl font-serif text-sage-deep mb-3 leading-tight">
                                    <Link to={`/resources/blogs/${blog.slug}`} className="hover:text-terracotta-dark transition-colors">
                                        {blog.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                                <div className="mt-auto">
                                    <Link to={`/resources/blogs/${blog.slug}`} className="text-terracotta-medium font-medium text-sm hover:text-terracotta-dark inline-flex items-center gap-1">
                                        Read Article
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blogs;

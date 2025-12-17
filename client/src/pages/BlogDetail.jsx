import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/ui/Button';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${slug}`);
                setBlog(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch blog", err);
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    if (loading) return <div className="pt-32 pb-20 text-center text-gray-500">Loading article...</div>;
    if (!blog) return <div className="pt-32 pb-20 text-center text-gray-500">Article not found.</div>;

    return (
        <article className="pt-32 pb-20">
            {/* Header */}
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-6 flex items-center gap-4 text-sm">
                    <Link to="/resources/blogs" className="text-terracotta-medium hover:text-terracotta-dark font-medium flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blogs
                    </Link>
                    <span className="text-gray-300">|</span>
                    <span className="text-terracotta-dark font-semibold uppercase tracking-wider">
                        {Array.isArray(blog.category) ? blog.category.join(' | ') : blog.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-sage-deep mb-8 leading-tight">{blog.title}</h1>
            </div>

            {/* Cover Image */}
            {blog.coverImage && (
                <div className="w-full mb-12 bg-gray-50 flex items-center justify-center rounded-xl overflow-hidden border border-gray-100">
                    <img
                        src={blog.coverImage.startsWith('http') ? blog.coverImage : `http://localhost:5000/${blog.coverImage}`}
                        alt={blog.title}
                        className="w-full h-auto max-h-[70vh] object-contain"
                    />
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-6 max-w-3xl">
                <div
                    className="prose prose-lg prose-headings:font-serif prose-headings:text-sage-deep prose-p:text-gray-600 prose-a:text-terracotta-medium hover:prose-a:text-terracotta-dark prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-serif text-sage-deep mb-2">Written By</h3>
                    <p className="text-gray-600 italic">{blog.author}</p>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;

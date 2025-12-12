import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const BlogCard = ({ image, category, title, date, slug }) => (
    <Link to={`/resources/blogs/${slug}`} className="group cursor-pointer block">
        <div className="rounded-xl overflow-hidden mb-4 relative aspect-[4/3]">
            <img
                src={image.startsWith('http') ? image : `http://localhost:5000/${image}`}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-terracotta-dark uppercase tracking-wider">
                {category}
            </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Icon name="Calendar" className="w-3 h-3" />
            <span>{date}</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-sage-deep group-hover:text-terracotta transition-colors mb-2 line-clamp-2">
            {title}
        </h3>
        <p className="text-sm font-medium text-sage-dark flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Article <Icon name="ArrowRight" className="w-3 h-3" />
        </p>
    </Link>
);

const FeaturedBlog = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Fetch all blogs, usually endpoints support pagination/params, but here we perform simple slice
                const res = await axios.get('http://localhost:5000/api/blogs');
                // Sort by date desc (if not already) and take 3
                const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setArticles(sorted.slice(0, 3));
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch feature blogs", err);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return null; // Or a skeleton loader
    if (articles.length === 0) return null;

    return (
        <section className="py-24 bg-sage-light/20">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <SectionTitle subtitle="Resources" title="Wisdom for Wellbeing" centered={false} />
                    <Link to="/resources/blogs" className="hidden md:block">
                        <Button variant="ghost">
                            View All Articles <Icon name="ArrowRight" className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <BlogCard
                            key={article._id}
                            image={article.coverImage}
                            category={article.category}
                            title={article.title}
                            date={new Date(article.createdAt).toLocaleDateString()}
                            slug={article.slug}
                        />
                    ))}
                </div>

                <div className="md:hidden mt-8 text-center">
                    <Link to="/resources/blogs">
                        <Button variant="ghost">
                            View All Articles <Icon name="ArrowRight" className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBlog;

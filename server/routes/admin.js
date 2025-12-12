const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { protect, admin } = require('../middleware/authMiddleware');
const Availability = require('../models/Availability');
const Blog = require('../models/Blog');

// Apply protection to all routes in this router
router.use(protect);
router.use(admin);

// Configure Multer for blog images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// ----------------------------------------------------------------------
// AVAILABILITY ROUTES (ADMIN)
// ----------------------------------------------------------------------

// POST /api/admin/availability - Toggle availability for a date
router.post('/availability', async (req, res) => {
    try {
        const { date, status } = req.body; // status is boolean (true = available, false = unavailable)

        let availability = await Availability.findOne({ date });

        if (availability) {
            availability.isAvailable = status;
            await availability.save();
        } else {
            availability = new Availability({
                date,
                isAvailable: status
            });
            await availability.save();
        }

        res.json(availability);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ----------------------------------------------------------------------
// BLOG ROUTES (ADMIN)
// ----------------------------------------------------------------------

// POST /api/admin/blogs - Create new blog
// upload.single('coverImage') allows uploading an image with key 'coverImage'
router.post('/blogs', upload.single('coverImage'), async (req, res) => {
    try {
        let coverImageUrl = '';
        if (req.file) {
            // Ideally deploy to S3/Cloudinary, but for now using localuploads
            // We need to serve this static folder in index.js to use it
            coverImageUrl = req.file.path.replace(/\\/g, "/");
        } else if (req.body.coverImageUrl) {
            coverImageUrl = req.body.coverImageUrl;
        }

        const blog = new Blog({
            title: req.body.title,
            slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            content: req.body.content,
            excerpt: req.body.excerpt,
            author: req.body.author,
            coverImage: coverImageUrl,
            category: req.body.category,
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
        });

        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/admin/blogs/:id - Update blog
router.put('/blogs/:id', upload.single('coverImage'), async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (req.body.title) blog.title = req.body.title;
        if (req.body.content) blog.content = req.body.content;
        if (req.body.excerpt) blog.excerpt = req.body.excerpt;
        if (req.body.category) blog.category = req.body.category;

        if (req.file) {
            blog.coverImage = req.file.path.replace(/\\/g, "/");
        }

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/admin/blogs/:id - Delete blog
router.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        await blog.deleteOne();
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Test Route
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is healthy' });
});

const Booking = require('../models/Booking');

const sendEmail = require('../utils/sendEmail');
const { getBookingConfirmationTemplate } = require('../utils/emailTemplates');

// Booking Route
router.post('/book', async (req, res) => {
    console.log('Booking request:', req.body);

    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        // Send Confirmation Email
        console.log('Attempting to send booking confirmation email to:', newBooking.email);
        try {
            await sendEmail({
                email: newBooking.email,
                subject: 'Appointment Booking Confirmation - Dr. Nitasha Buldeo',
                message: `Thank you for booking. Your appointment for ${newBooking.service} is on ${newBooking.date} at ${newBooking.time}.`, // Fallback
                html: getBookingConfirmationTemplate(newBooking)
            });
            console.log('Booking confirmation email sent successfully to:', newBooking.email);
        } catch (emailError) {
            console.error('Failed to send booking confirmation email. Error details:', emailError);
            // We don't fail the request if email fails, just log it
        }

        res.json({ success: true, message: 'Booking request received successfully' });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ success: false, message: 'Server error processing booking' });
    }
});

const ClientSubmission = require('../models/ClientSubmission');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer
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

// Client Form Route
router.post('/client-form', upload.array('medicalReports', 5), async (req, res) => {
    console.log('Client Form request body:', req.body);
    console.log('Client Form files:', req.files);

    try {
        const filePaths = req.files ? req.files.map(file => file.path) : [];

        const submissionData = {
            ...req.body,
            medicalReports: filePaths
        };

        const newSubmission = new ClientSubmission(submissionData);
        await newSubmission.save();
        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error saving submission:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const Blog = require('../models/Blog');
const Availability = require('../models/Availability');

// ----------------------------------------------------------------------
// AVAILABILITY ROUTES
// ----------------------------------------------------------------------

// GET /api/availability - Get all future available dates with available slots
router.get('/availability', async (req, res) => {
    try {
        // Get dates from today onwards
        const today = new Date().toISOString().split('T')[0];

        // 1. Get defined availability
        const availabilities = await Availability.find({
            date: { $gte: today },
            isAvailable: true
        });

        // 2. Get existing bookings for these dates
        // We only care about bookings that are NOT cancelled
        const bookings = await Booking.find({
            preferredDate: { $gte: new Date(today) },
            status: { $ne: 'cancelled' }
        });

        // 3. Process availability to remove booked slots
        const availabilityWithSlots = availabilities.map(avail => {
            const dateStr = avail.date; // "YYYY-MM-DD"

            // Find bookings for this specific date
            // Note: Booking.preferredDate is a Date object, avail.date is String
            const daysBookings = bookings.filter(b => {
                const bookingDate = b.preferredDate.toISOString().split('T')[0];
                return bookingDate === dateStr;
            });

            const bookedTimes = daysBookings.map(b => b.preferredTime);

            // Filter out the booked times from the available slots
            const remainingSlots = avail.slots.filter(slot => !bookedTimes.includes(slot));

            return {
                date: avail.date,
                slots: remainingSlots,
                isAvailable: remainingSlots.length > 0 // Only true if there are actually slots left
            };
        });

        // Filter out dates that have no slots left
        const finalAvailability = availabilityWithSlots.filter(a => a.isAvailable && a.slots.length > 0);

        res.json(finalAvailability);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ----------------------------------------------------------------------
// BLOG ROUTES
// ----------------------------------------------------------------------

// GET /api/blogs - Get all blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/blogs/:slug - Get single blog by slug
router.get('/blogs/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

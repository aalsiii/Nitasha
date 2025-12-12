const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    serviceType: { type: String, required: true }, // e.g., 'Initial Consultation', 'Follow-up'
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    preferredDate: { type: Date },
    preferredTime: { type: String },
    notes: { type: String },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);

const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
    date: {
        type: String, // Storing as YYYY-MM-DD string for easier matching
        required: true,
        unique: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    slots: {
        type: [String], // Array of time strings, e.g. ["12:00 PM", "12:15 PM"]
        default: [
            "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
            "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
            "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM",
            "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM"
        ]
    }
});

module.exports = mongoose.model('Availability', AvailabilitySchema);

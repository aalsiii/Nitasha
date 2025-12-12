const mongoose = require('mongoose');

const ClientSubmissionSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String }, // Residential Address
    medicalReports: [{ type: String }], // Array of file paths
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClientSubmission', ClientSubmissionSchema);

import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const ClientForm = () => {
    const days = [
        { name: 'Monday', time: '09:00 – 17:00' },
        { name: 'Tuesday', time: '09:00 – 17:00' },
        { name: 'Wednesday', time: '09:00 – 17:00' },
        { name: 'Thursday', time: '09:00 – 17:00' },
        { name: 'Friday', time: '09:00 – 17:00' },
        { name: 'Saturday', time: 'Closed', closed: true },
        { name: 'Sunday', time: 'Closed', closed: true },
    ];

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    });

    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState(null); // null, 'submitting', 'success', 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        // Append files
        if (files) {
            for (let i = 0; i < files.length; i++) {
                data.append('medicalReports', files[i]);
            }
        }

        try {
            const response = await fetch('http://localhost:5000/api/client-form', {
                method: 'POST',
                body: data, // Send FormData object
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    message: ''
                });
                setFiles([]);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    return (
        <div className="animate-fade-in bg-cream min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto mb-8 text-center">
                    <h1 className="text-4xl font-serif text-sage-deep mb-2">Let us have some details.</h1>
                    <p className="text-gray-600">Please fill in the form below to help us prepare for your consultation.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Form Section */}
                    <div className="md:col-span-2 bg-white rounded-xl shadow-xl p-8 md:p-12 border-t-4 border-terracotta">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-sage/20 text-sage-deep rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon name="Check" className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-serif text-sage-deep mb-2">Thank you!</h3>
                                <p className="text-gray-600">Your details have been received. We will be in touch shortly.</p>
                                <Button onClick={() => setStatus(null)} variant="outline" className="mt-6">Send another response</Button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-sage-deep">First Name</label>
                                        <input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-terracotta transition-colors"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-sage-deep">Last Name</label>
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-terracotta transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-sage-deep">Email Address</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            type="email"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-terracotta transition-colors"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-sage-deep">Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            type="tel"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-terracotta transition-colors"
                                            placeholder="+44 7700 900000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-sage-deep">Residential Address</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-terracotta transition-colors h-24 resize-none"
                                        placeholder="Enter your full address"
                                    ></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-sage-deep">Attach Medical Reports</label>
                                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-sage-light file:text-sage-dark
                                                hover:file:bg-sage-light/80
                                            "
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-sage-deep">Message (Optional)</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-terracotta transition-colors h-32 resize-none"
                                        placeholder="Tell us a bit more about what you're experiencing..."
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="text-red-500 text-sm text-center">
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <Button type="submit" className="w-full justify-center" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Sending...' : 'Submit Details'}
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-sage-dark text-white p-8 rounded-xl shadow-lg">
                            <h3 className="font-serif text-2xl mb-6 flex items-center gap-2">
                                <Icon name="Clock" className="w-6 h-6 text-terracotta" />
                                Opening Hours
                            </h3>
                            <ul className="space-y-3">
                                {days.map((day) => (
                                    <li key={day.name} className="flex justify-between items-center text-sm border-b border-white/10 pb-2 last:border-0 last:pb-0">
                                        <span className="opacity-90">{day.name}</span>
                                        <span className={`font-medium ${day.closed ? 'text-terracotta' : 'text-white'}`}>
                                            {day.time}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-serif text-xl mb-4 text-sage-deep">Contact Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Icon name="MapPin" className="w-5 h-5 text-terracotta mt-1" />
                                    <p className="text-gray-600 text-sm">123 Wellness Avenue,<br />London, SW1 4AX</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Icon name="Phone" className="w-5 h-5 text-terracotta" />
                                    <p className="text-gray-600 text-sm">+44 (0) 20 7123 4567</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Icon name="Mail" className="w-5 h-5 text-terracotta" />
                                    <p className="text-gray-600 text-sm">hello@drnitasha.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientForm;

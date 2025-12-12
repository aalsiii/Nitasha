import React, { useState, useEffect } from 'react';
import Icon from '../../ui/Icon';
import Button from '../../ui/Button';

const BookingModal = ({ isOpen, onClose, selectedService }) => {
    // Step 1: Service Selection (Visual Cards) - Only shown if selectedService is null
    // Step 2: Booking Form
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        serviceType: '',
        clientName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
    });
    const [status, setStatus] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);

    // Time slots (12:00 PM to 3:45 PM)
    const timeSlots = [
        "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
        "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
        "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM",
        "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM"
    ];

    useEffect(() => {
        if (isOpen) {
            fetchAvailability();

            // If a specific service is passed, jump straight to form (Step 2)
            // Otherwise, show selection screen (Step 1)
            if (selectedService) {
                setFormData(prev => ({ ...prev, serviceType: selectedService, preferredTime: '' }));
                setStep(2);
            } else {
                setFormData(prev => ({ ...prev, serviceType: '', preferredTime: '' }));
                setStep(1);
            }

            setStatus(null);
        }
    }, [isOpen, selectedService]);

    const fetchAvailability = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/availability');
            const data = await res.json();
            const dates = data.filter(d => d.isAvailable).map(d => d.date);
            setAvailableDates(dates);
        } catch (err) {
            console.error("Failed to fetch availability", err);
        }
    };

    if (!isOpen) return null;

    const handleServiceSelect = (service) => {
        setFormData({ ...formData, serviceType: service });
        setStep(2);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTimeSelect = (time) => {
        setFormData({ ...formData, preferredTime: time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.preferredTime) {
            alert("Please select a time slot.");
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch('http://localhost:5000/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Booking error:', error);
            setStatus('error');
        }
    };

    const resetModal = () => {
        setStatus(null);
        setStep(1);
        setFormData({
            serviceType: '',
            clientName: '',
            email: '',
            phone: '',
            preferredDate: '',
            preferredTime: '',
            notes: ''
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetModal}></div>
            <div className="bg-white rounded-2xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">

                <div className="bg-sage-dark p-6 text-white text-center relative">
                    <h3 className="font-serif text-2xl">Book Appointment</h3>
                    <button onClick={resetModal} className="absolute top-4 right-4 text-white/80 hover:text-white">
                        <Icon name="X" className="w-5 h-5" />
                    </button>
                    {/* Show service in header if in step 2 */}
                    {step === 2 && formData.serviceType && (
                        <p className="text-white/90 text-sm mt-2 font-medium bg-white/10 inline-block px-3 py-1 rounded-full">
                            {formData.serviceType}
                        </p>
                    )}
                </div>

                <div className="p-6">
                    {status === 'success' ? (
                        <div className="text-center py-8 space-y-4">
                            <div className="w-16 h-16 bg-sage/20 text-sage-deep rounded-full flex items-center justify-center mx-auto">
                                <Icon name="Check" className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-serif text-sage-deep">Request Received</h4>
                            <p className="text-gray-600">
                                Thank you, {formData.clientName}. We have received your booking request for <strong>{formData.serviceType}</strong> on {formData.preferredDate} at {formData.preferredTime}.
                                We will contact you at {formData.email} shortly to confirm.
                            </p>
                            <Button onClick={resetModal} className="w-full justify-center mt-4">Close</Button>
                        </div>
                    ) : step === 1 ? (
                        /* STEP 1: VISUAL SERVICE SELECTION */
                        <div className="space-y-4">
                            <p className="text-center text-gray-600 mb-4">Select a service type to continue:</p>

                            <div
                                onClick={() => handleServiceSelect('Initial Consultation')}
                                className="p-4 border border-gray-200 rounded-lg hover:border-sage-dark cursor-pointer transition-colors bg-cream/50 group"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-sage-deep group-hover:text-terracotta transition-colors">Initial Consultation</span>
                                    <span className="text-xs font-semibold bg-white px-2 py-1 rounded border border-gray-100">60 mins</span>
                                </div>
                                <span className="text-sm text-gray-500">Comprehensive health assessment & history taking.</span>
                            </div>

                            <div
                                onClick={() => handleServiceSelect('Follow-up Session')}
                                className="p-4 border border-gray-200 rounded-lg hover:border-sage-dark cursor-pointer transition-colors group"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-sage-deep group-hover:text-terracotta transition-colors">Follow-up Session</span>
                                    <span className="text-xs font-semibold bg-gray-50 px-2 py-1 rounded border border-gray-100">45 mins</span>
                                </div>
                                <span className="text-sm text-gray-500">Review progress and adjust treatment plan.</span>
                            </div>

                            <div
                                onClick={() => handleServiceSelect('Specialized Therapy')}
                                className="p-4 border border-gray-200 rounded-lg hover:border-sage-dark cursor-pointer transition-colors group"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-sage-deep group-hover:text-terracotta transition-colors">Specialized Therapy</span>
                                    <span className="text-xs font-semibold bg-gray-50 px-2 py-1 rounded border border-gray-100">Varies</span>
                                </div>
                                <span className="text-sm text-gray-500">Acupuncture, Massage, or other specific treatments.</span>
                            </div>
                        </div>
                    ) : (
                        /* STEP 2: DETAILS FORM */
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Service Change Link - If user wants to switch back (only if not forced) */}
                            {!selectedService && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-xs text-sage-deep underline hover:text-terracotta"
                                    >
                                        Change Service
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700">Name</label>
                                    <input required name="clientName" value={formData.clientName} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded text-sm" placeholder="Your Name" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700">Phone</label>
                                    <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded text-sm" placeholder="Your Phone" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Email</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded text-sm" placeholder="Your Email" />
                            </div>

                            {/* Date Selection */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Preferred Date</label>
                                {availableDates.length > 0 ? (
                                    <select
                                        name="preferredDate"
                                        value={formData.preferredDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 bg-gray-50 border rounded text-sm appearance-none"
                                    >
                                        <option value="">Select an available date...</option>
                                        {availableDates.sort().map(date => (
                                            <option key={date} value={date}>
                                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="text-sm text-gray-500 italic p-2 bg-gray-50 border rounded">
                                        No available dates found in current schedule.
                                    </div>
                                )}
                            </div>

                            {/* Time Selection Grid */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700">Preferred Time</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {timeSlots.map(time => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => handleTimeSelect(time)}
                                            className={`
                                                py-2 px-1 text-xs rounded border transition-colors
                                                ${formData.preferredTime === time
                                                    ? 'bg-sage text-white border-sage'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-sage'
                                                }
                                            `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Notes (Optional)</label>
                                <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded text-sm h-16 resize-none" placeholder="Any specific concerns?"></textarea>
                            </div>

                            {status === 'error' && <p className="text-red-500 text-xs text-center">Submission failed. Please try again.</p>}

                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={onClose} className="flex-1 justify-center">Cancel</Button>
                                <Button type="submit" className="flex-1 justify-center" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Submitting...' : 'Confirm'}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;

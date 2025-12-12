import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../ui/Button'; // Adjusted path: up 2 levels then to ui/Button

const AvailabilityManager = () => {
    // Generate next 14 days for management
    const [dates, setDates] = useState([]);
    const [availabilityMap, setAvailabilityMap] = useState({}); // { 'YYYY-MM-DD': true/false }
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Generate dates
        const nextDates = [];
        for (let i = 0; i < 14; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            nextDates.push(date.toISOString().split('T')[0]);
        }
        setDates(nextDates);
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/availability');
            // Convert array of { date, isAvailable } to map
            const map = {};
            // Default everything to unavailable unless specified? Or available?
            // Let's assume default is Unavailable for safety, admin enables dates.
            // Or based on user request "add available dates", admin explicitly adds them.
            res.data.forEach(item => {
                map[item.date] = item.isAvailable;
            });
            setAvailabilityMap(map);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleDate = async (date) => {
        const currentStatus = availabilityMap[date] || false; // Default false
        const newStatus = !currentStatus;

        // Optimistic update
        setAvailabilityMap(prev => ({ ...prev, [date]: newStatus }));

        try {
            await axios.post('http://localhost:5000/api/admin/availability', {
                date,
                status: newStatus
            });
        } catch (err) {
            console.error("Failed to update availability", err);
            // Revert on error
            setAvailabilityMap(prev => ({ ...prev, [date]: currentStatus }));
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-serif text-xl text-sage-deep mb-6">Manage Available Dates</h2>
            <p className="text-gray-500 text-sm mb-6">Click on a date to toggle its availability for bookings (Green = Available).</p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {dates.map(date => {
                    const isAvailable = availabilityMap[date] === true;
                    return (
                        <button
                            key={date}
                            onClick={() => toggleDate(date)}
                            className={`
                                p-4 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center gap-2
                                ${isAvailable
                                    ? 'bg-sage/10 border-sage text-sage-deep shadow-sm hover:bg-sage/20'
                                    : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'
                                }
                            `}
                        >
                            <span className="text-xs font-semibold uppercase">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            <span className="text-lg font-bold font-serif">{new Date(date).getDate()}</span>
                            <span className="text-xs">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${isAvailable ? 'bg-sage text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {isAvailable ? 'OPEN' : 'CLOSED'}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AvailabilityManager;

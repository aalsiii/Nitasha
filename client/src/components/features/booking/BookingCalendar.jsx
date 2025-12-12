import React, { useState, useEffect } from 'react';
import Icon from '../../ui/Icon';
import axios from 'axios';

const BookingCalendar = ({ onDateSelect, selectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [availableDates, setAvailableDates] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mock data for fallback when DB is down
    const MOCK_AVAILABLE_DATES = [
        new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], // Tomorrow
        new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0], // 3 days from now
        new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().split('T')[0],
        new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
        new Date(new Date().setDate(new Date().getDate() + 8)).toISOString().split('T')[0],
    ];

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        setLoading(true);
        try {
            // Try to fetch from API
            const res = await axios.get('http://localhost:5000/api/availability');
            // Extract just the date strings from the response objects
            const apiDates = res.data.map(d => d.date);
            setAvailableDates(apiDates);
        } catch (err) {
            console.log("Using mock data due to connection error:", err.message);
            // Fallback to mock data
            setAvailableDates(MOCK_AVAILABLE_DATES);
        } finally {
            setLoading(false);
        }
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const dateStr = formatDateString(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (availableDates.includes(dateStr)) {
            onDateSelect(dateStr);
        }
    };

    const formatDateString = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty slots for days before start of month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
        }

        // Days of month
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = formatDateString(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isAvailable = availableDates.includes(dateStr);
            const isSelected = selectedDate === dateStr;

            days.push(
                <button
                    key={i}
                    disabled={!isAvailable}
                    onClick={() => handleDateClick(i)}
                    className={`
                        h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium transition-all
                        ${isSelected
                            ? 'bg-terracotta-dark text-white shadow-md scale-110'
                            : isAvailable
                                ? 'bg-sage-light text-sage-deep hover:bg-sage hover:text-white cursor-pointer'
                                : 'text-gray-300 cursor-not-allowed'
                        }
                    `}
                >
                    {i}
                </button>
            );
        }

        return days;
    };

    const hasAvailableDatesInMonth = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = formatDateString(currentDate.getFullYear(), currentDate.getMonth(), i);
            if (availableDates.includes(dateStr)) return true;
        }
        return false;
    };

    // Month names
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6 px-2">
                <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full text-sage-deep">
                    <Icon name="ChevronLeft" className="w-5 h-5" />
                </button>
                <div className="font-serif font-bold text-lg text-sage-deep">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full text-sage-deep">
                    <Icon name="ChevronRight" className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="text-xs font-bold text-gray-400 py-1">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 place-items-center">
                {renderCalendarDays()}
            </div>

            <div className="mt-4 text-center">
                {!hasAvailableDatesInMonth() && !loading && (
                    <p className="text-sm text-terracotta-dark bg-terracotta/10 py-2 px-3 rounded-lg inline-block">
                        There are no available dates for this month.
                    </p>
                )}
                {hasAvailableDatesInMonth() && !selectedDate && (
                    <p className="text-sm text-sage-dark animate-pulse">
                        Please choose from the highlighted dates.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BookingCalendar;

import React from 'react';

const TimeSlotPicker = ({ slots, selectedSlot, onSelect }) => {
    return (
        <div className="animate-fade-in">
            <h4 className="text-center font-serif text-xl text-sage-deep mb-6 font-bold">Afternoon</h4>
            <div className="grid grid-cols-2 gap-4">
                {slots.map((slot) => (
                    <button
                        key={slot}
                        onClick={() => onSelect(slot)}
                        className={`
                            py-3 px-2 rounded border border-terracotta-dark/60 text-sm font-medium transition-all duration-200
                            ${selectedSlot === slot
                                ? 'bg-terracotta-dark text-white shadow-md transform scale-[1.02]'
                                : 'text-sage-deep hover:bg-terracotta/10 hover:border-terracotta-dark'
                            }
                        `}
                    >
                        {slot}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeSlotPicker;

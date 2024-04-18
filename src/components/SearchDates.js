import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SearchDates = ({ onSearch }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSearch = () => {
        if (startDate && endDate && startDate <= endDate) {
            onSearch(startDate, endDate);
        } else {
            toast("End date must be greater than start date");
        }
    };

    const handleEndDateBlur = () => {
        // Trigger search when the user finishes selecting the end date
        handleSearch();
    };

    return (
        <div className='dates-container'>
            <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                min={new Date(Date.now() - 1500 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}
                max={new Date().toJSON().slice(0, 10)}
            />
            <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                onBlur={handleEndDateBlur}
                min={new Date(Date.now() - 1500 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}
                max={new Date().toJSON().slice(0, 10)}
            />
        </div>
    );
};

export default SearchDates;

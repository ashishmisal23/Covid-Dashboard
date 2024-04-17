import React, { useState } from 'react';

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
        onSearch(startDate, endDate);
    };

    return (
        <div>
            <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Start Date"
            />
            <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="End Date"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchDates;

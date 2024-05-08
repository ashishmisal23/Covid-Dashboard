import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchDates from './SearchDates';

const SearchBar = ({ onSelectCountry, onSelectingDateRange }) => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('USA');
    const [display, setDisplay] = useState('none');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const sortedCountries = response.data.sort((a, b) => {
                    return a.name.common.localeCompare(b.name.common);
                });
                setCountries(sortedCountries);
                const countryNames = sortedCountries.map(country => country.name.common);
                setFilteredCountries(countryNames);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleSearch = (e) => {
        setSelectedCountry(e.target.value);
        setSearchTerm(e.target.value)
        const term = e.target.value.toLowerCase();
        const filtered = countries.filter((country) =>
            country?.name.common.toLowerCase().includes(term)
        );
        const countryNames = filtered.map(country => country.name.common);
        setFilteredCountries(countryNames);
    };


    const handleSelectCountry = (countryName) => {
        setDisplay('none');
        setSelectedCountry(countryName);
        onSelectCountry(countryName);
        setSearchTerm(countryName)
    };


    const handleDateRangeSearch = (startDate, endDate) => {
        onSelectingDateRange(startDate, endDate);
    };

    return (
        <div className='search-bar'>
            <div className="search-container">
                <input
                    type="text"
                    placeholder={"Search Country..."}
                    value={searchTerm}
                    onChange={(e) => { handleSearch(e) }}
                    onKeyDownCapture={(e) => {
                        if (e.key === "Enter") {
                            setDisplay('block')
                            handleSearch(e);
                        }
                    }}
                />

                <div className="dropdown">
                    <button
                        className="dropbtn"
                        onClick={() => { setDisplay('block') }}>
                        &#9660;
                    </button>
                    <ul className={`dropdown-content ${display}`}
                        onMouseLeave={() => { setDisplay('none') }}

                    >
                        {filteredCountries.map((countryName) => (
                            <li
                                key={countryName}
                                onClick={() => handleSelectCountry(countryName)}
                                className='p-1 border text-center min-w-max'
                            >
                                {countryName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>




            <SearchDates onSearch={handleDateRangeSearch} />
        </div>
    );
};

export default SearchBar;

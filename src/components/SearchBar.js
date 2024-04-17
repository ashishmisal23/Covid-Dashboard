import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchDates from './SearchDates';

const SearchBar = ({ onSelectCountry, onSelectingDateRange }) => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const sortedCountries = response.data.sort((a, b) => {
                    return a.name.common.localeCompare(b.name.common);
                });
                setCountries(sortedCountries);
                setFilteredCountries(sortedCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = countries.filter((country) =>
            country?.name.common.toLowerCase().includes(term)
        );
        setFilteredCountries(filtered);
    };

    const handleSelectCountry = (country) => {
        setSearchTerm('');
        setFilteredCountries([]);
        console.log('Selected country:', country.name.common);
        onSelectCountry(country.name.common)

    };

    const handleDateRangeSearch = (startDate, endDate) => {
        onSelectingDateRange(startDate, endDate)
    };

    return (
        <>
            <div className='flex flex-row gap-10 justify-between max-w-screen p-2'>
                <input
                    type="text"
                    placeholder="Search Country..."
                    value={searchTerm}
                    onChange={handleSearch}
                >
                </input>

                <SearchDates onSearch={handleDateRangeSearch} />
            </div>
            <div className=" flex text-center max-h-16 overflow-hidden border p-2 pb-3">
                {filteredCountries.length > 0 && (
                    <ul className='flex flex-row flex-nowrap gap-3'>
                        {filteredCountries.map((country) => (
                            <li
                                key={country.cca2}
                                onClick={() => handleSelectCountry(country)}
                                className='p-1 border text-center min-w-max '
                            >
                                {country.name.common}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default SearchBar;

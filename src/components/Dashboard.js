import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import Navbar from './Navbar';
import Chart from './Chart';

const Dashboard = () => {
    const [country, setCountry] = useState('usa');
    const [days, setDays] = useState(1500);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);



    const BASE_URL = 'https://disease.sh/v3/covid-19/historical';

    const fetchData = async () => {
        try {
            const url = `${BASE_URL}/${country}?lastdays=${days}`;
            const response = await axios.get(url);
            let newData = response?.data?.timeline;
            setData(newData);
            setLoading(false);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [country, days]);


    const calculateDays = (startDate, endDate) => {
        console.log(startDate, endDate)
        const startMillis = new Date(startDate).getTime();
        const endMillis = new Date(endDate).getTime();
        const difference = Math.abs(endMillis - startMillis);
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
        setDays(days);
    };

    return (
        <div className='ml-20 mr-20'>
            <Navbar />
            <SearchBar
                onSelectCountry={(selectedCountry) => setCountry(selectedCountry)}
                onSelectingDateRange={(startDate, endDate) => { calculateDays(startDate, endDate) }}
            />
            <div className='flex flex-row flex-auto	 gap-2 align-middle w-full max-w-screen-2xl'>
                <div className="max-w-48 order-1	">
                    <Chart data={data} loading={loading} />
                </div>
                <div className="max-w-48 order-2	">
                    <Chart data={data} loading={loading} />
                </div>
            </div>


        </div>
    );
};

export default Dashboard;

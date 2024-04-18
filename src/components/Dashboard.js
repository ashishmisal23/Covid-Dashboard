import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import Navbar from './Navbar';
import Chart from './Chart';
import PieChart from './PieChart ';
import Count from './Count';

const Dashboard = () => {
    const [country, setCountry] = useState('');
    const [days, setDays] = useState(1500);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [newData2, setNewData2] = useState({ totalCases: 0, totalDeaths: 0, totalRecovered: 0 })


    const BASE_URL = 'https://disease.sh/v3/covid-19/historical';



    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = '';
                if (country) {
                    (url = `${BASE_URL}/${country}?lastdays=${days}`);
                }
                else {

                    (url = `${BASE_URL}/usa?lastdays=${days}`);
                }
                const response = await axios.get(url);
                let newData = response?.data?.timeline;
                setData(newData);
                setLoading(false);

                if (newData && newData.cases && newData.deaths && newData.recovered) {
                    setNewData2({
                        totalCases: Math.max.apply(null, Object.values(newData.cases)) / 1000000,
                        totalDeaths: Math.max.apply(null, Object.values(newData.deaths)) / 1000000,
                        totalRecovered: Math.max.apply(null, Object.values(newData.recovered)) / 1000000,
                    })

                }


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

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

            {!loading ? (
                <div className="count-container">
                    <Count data={newData2} />
                </div>
            ) : (
                <div className="count-container">Loading...</div>
            )}


            <div className='flex flex-row flex-auto	 gap-2 align-middle w-full max-w-screen-2xl'>
                <div className="max-w-36 chart">
                    <Chart data={data} loading={loading} />
                </div>
                <div className="max-w-36 chart">
                    <PieChart data={data} loading={loading} />
                </div>
            </div>


        </div>
    );
};

export default Dashboard;

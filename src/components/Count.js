import React from 'react'

const Count = ({ data }) => {

    const { totalCases, totalDeaths, totalRecovered } = data;
    return (
        <>
            <div className="count">
                <span className='count-heading' id='cases'>Total Cases</span>
                <span className='count-number'>{totalCases?.toFixed(1)} M</span>

            </div>
            <div className="count">
                <span className='count-heading' id='deaths'>Deaths</span>
                <span className='count-number'>{totalDeaths?.toFixed(1)} M</span>
            </div>
            <div className="count">
                <span className='count-heading' id='recovered'>Recoveries
                </span>
                <span className='count-number'>{totalRecovered?.toFixed(1)} M</span>
            </div>
        </>
    )
}

export default Count
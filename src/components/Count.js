import React from 'react'

const Count = ({ data }) => {

    const { totalCases, totalDeaths, totalRecovered } = data;
    return (
        <>
            <div className="count">
                totalCases:{totalCases?.toFixed(1)}
            </div>
            <div className="count">
                totalDeaths:{totalDeaths?.toFixed(1)}
            </div>
            <div className="count">
                totalRecovered:{totalRecovered?.toFixed(1)}
            </div>
        </>
    )
}

export default Count
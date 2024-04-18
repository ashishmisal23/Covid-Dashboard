import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import SyncLoader from "react-spinners/SyncLoader";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({ data, loading }) => {

    const [chartData, setChartData] = useState({
        animationEnabled: true,
        backgroundColor: "transparent",
        padding: "2rem",
        title: {
            text: "Pie Chart",
            fontSize: 16,
            fontFamily: "arial",
            fontWeight: "bold"
        },
        toolTip: {
            shared: true
        },
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center",
            fontSize: 10
        },
        showInLegend: true,
        data: [{
            type: "doughnut",
            radius: "90%",
            showInLegend: true,
            dataPoints: []
        },]
    });


    useEffect(() => {
        const updateChartData = () => {
            if (data && data.cases && data.deaths && data.recovered) {

                const totalCases = Math.max.apply(null, Object.values(data.cases)) / 1000000;
                const totalDeaths = Math.max.apply(null, Object.values(data.deaths)) / 1000000;
                const totalRecovered = Math.max.apply(null, Object.values(data.recovered)) / 1000000;

                const newData = [
                    {
                        y: totalCases,
                        label: "Total Cases",
                        legendText: "Total Cases (M)"

                    },
                    {
                        y: totalDeaths,
                        label: "Total Deaths",
                        legendText: "Total Deaths (M)"
                    },
                    {
                        y: totalRecovered,
                        label: "Total Recovered",
                        legendText: "Total Recovered (M)"
                    }
                ];

                setChartData({
                    animationEnabled: true,
                    backgroundColor: "transparent",
                    padding: "2rem",
                    title: {
                        text: "Pie Chart",
                        fontSize: 16,
                        fontFamily: "arial",
                        fontWeight: "bold"
                    },
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        verticalAlign: "bottom",
                        horizontalAlign: "center",
                        fontSize: 10
                    },
                    showInLegend: true,
                    data: [{
                        type: "doughnut",
                        radius: "90%",
                        showInLegend: true,
                        dataPoints: newData
                    }]
                });
            }
        };

        updateChartData();
    }, [data]);





    return (

        !loading ? (
            <>
                {chartData && <CanvasJSChart options={chartData} />}
            </>
        ) : (
            <>
                <div className="loading">
                    <div>
                        <SyncLoader
                            color="#ff0000"
                            loading
                            size={20}

                        />
                    </div>
                </div>
            </>
        )
    );
};

export default PieChart;

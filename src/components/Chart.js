import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import SyncLoader from 'react-spinners/SyncLoader';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = ({ data, loading }) => {

    const [chartData, setChartData] = useState({
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
            text: "Line Chart",
            margin: 25,
            padding: 4,
            verticalAlign: "top",
            horizontalAlign: "left",
            fontSize: 16,
            fontFamily: "arial",
            fontWeight: "bold"
        },
        toolTip: {
            shared: true
        },
        axisY: {
            title: "Number of Cases (Millions)",
            labelFormatter: function (e) {
                return (e.value * 100).toFixed(1);
            },
            margin: 30,
            gridThickness: 0,
            majorGridLines: 0,
            minorGridLines: 0
        },
        axisX: {
            valueFormatString: "YYYY",
            gridThickness: 0,
            majorGridLines: 0,
            minorGridLines: 0,
            margin: 30
        },
        data: [{
            type: "line",
            lineColor: "blue",
            name: "cases",
            showInLegend: false,
            dataPoints: []
        },
        {
            type: "line",
            lineColor: "red",
            name: "deaths",
            showInLegend: false,
            dataPoints: []
        },
        {
            type: "line",
            lineColor: "green",
            name: "recovered",
            showInLegend: false,
            dataPoints: []
        }]
    });



    useEffect(() => {
        const updateChartData = () => {
            const newChartData = {
                ...chartData,
                data: [
                    {
                        ...chartData.data[0],
                        dataPoints: mapDataToDataPoints(data.cases)
                    },
                    {
                        ...chartData.data[1],
                        dataPoints: mapDataToDataPoints(data.deaths)
                    },
                    {
                        ...chartData.data[2],
                        dataPoints: mapDataToDataPoints(data.recovered)
                    }
                ]
            };
            setChartData(newChartData);

        };

        const mapDataToDataPoints = (data) => {
            const uniqueYears = [...new Set(Object.keys(data).map(date => new Date(date).getFullYear()))];
            const dataPoints = [];

            uniqueYears.forEach(year => {
                const latestDataPoint = Object.keys(data)
                    .filter(date => new Date(date).getFullYear() === year)
                    .reduce((latest, currentDate) => {
                        if (!latest || new Date(currentDate) > new Date(latest)) {
                            return currentDate;
                        }
                        return latest;
                    }, null);

                if (latestDataPoint) {
                    dataPoints.push({
                        y: data[latestDataPoint] / 1000000,
                        label: year.toString()
                    });
                }
            });

            return dataPoints;
        };

        if (data && Object.keys(data).length > 0) {
            updateChartData();
        }
    }, [data]);

    return (

        !loading ? (
            <>
                <CanvasJSChart options={chartData} />
            </>
        ) : (

            <div className="loading">
                <div>
                    <SyncLoader
                        color="#ff0000"
                        loading
                        size={20}
                    />
                </div>
            </div>

        )
    );
};

export default Chart;

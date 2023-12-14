'use client'
import * as React from 'react'
import { Stack, Typography } from "@mui/material"
import ReactApexChart from 'react-apexcharts'
import UserContext from '@context/userContext';




const AdminDashboard = () => {

    const { tabOpened, setTabOpened } = React.useContext(UserContext)


    React.useEffect(() => {
        setTabOpened('Product Track')
    }, [])

    const [topExpenseSectors, setTopExpenseSectors] = React.useState({
        series: [44, 55, 13, 43, 22],
        options: {
            title: {
                text: 'Top Expense Sectors', // Set the title text
                align: 'center', // Set the title alignment (left, center, right)
                margin: 50,
                style: {
                    fontSize: '20px', // Set the title font size
                    color: '#FFF', // Set the title color
                    fontFamily: 'Livvic',
                },
            },
            chart: {
                width: 420,
                type: 'pie',
                background: '#223f3d',
            },
            colors: ['rgb(24, 119, 242)', 'rgb(255, 86, 48)', 'rgb(0, 184, 217)', 'rgb(255, 171, 0)', '#81ae40', '#40ae9f'],
            theme: {
                mode: 'dark',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],

            stroke: {
                color: 'none', // Set to 'none' to remove the border of the pie chart
                width: 0, // Set the border width to 0
            },

            legend: {
                position: 'right', // Set the legend position
                offsetY: 80, // Set the margin from the bottom of the legend
                markers: {
                    width: 15, // Set the width of legend markers
                    height: 15, // Set the height of legend markers
                },
                fontSize: '14px',
            },
        },
    })




    const [topSellingProduct, setTopSellingProduct] = React.useState({
        series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
        options: {
            title: {
                text: 'Top Selling Products', // Set the title text
                align: 'center', // Set the title alignment (left, center, right)
                margin: 30,
                style: {
                    fontSize: '20px', // Set the title font size
                    color: '#FFF', // Set the title color
                    fontFamily: 'Livvic',
                },
            },
            chart: {
                type: 'bar',
                height: 350,
                background: '#223f3d',
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true,
                    },
                    offsetX: 0, // Adjust the offset on the x-axis
                    offsetY: 30, // Adjust the offset on the y-axis
                    autoSelected: 'zoom', // Auto-select zoom tool when the chart is initialized
                },
            },
            theme: {
                mode: 'dark',
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                    columnWidth: '100%',

                }
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                    'United States', 'China', 'Germany'
                ],
            },
            grid: {
                borderColor: '#366562',
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            stroke: {
                color: 'none', // Set to 'none' to remove the border of the pie chart
                width: 0, // Set the border width to 0
            },
        },
    })







    return (
        <div style={{ padding: '20px 30px', height: '100%', width: '100%', position: 'relative' }}>









        </div>
    )
}

export default AdminDashboard
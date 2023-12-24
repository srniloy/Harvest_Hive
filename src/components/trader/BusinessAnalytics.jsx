import { Stack } from '@mui/material';

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import ReactApexChart from 'react-apexcharts'

import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';


const BusinessAnalytics = (props) => {

  const [topExpenseSectors, setTopExpenseSectors] = React.useState({
    series: [44, 55, 13, 43],
    options: {
        title: {
            text: 'Revenue Generated', // Set the title text
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
        labels: ['Tometo', 'Cabbage', 'Onion', 'Poteto'],
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
        data: [400, 430, 448, 470, 540]
    }],
    options: {
        title: {
            text: 'Sales Over Month', // Set the title text
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
                horizontal: false,
                columnWidth: '40%',
  
            }
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ['Jan 01, 2023','Feb 04, 2023','Mar 23, 2023','Jun 3, 2023','jul 8, 2023',
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


  const [totalCalculations, setTotalCalculations] = React.useState(undefined)


  const fetchTotalCalculations = async ()=>{

      const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: props.info?.user_id}),
      };

      const res = await fetch(
      '/api/get/total_calculations_for_trader',
      postData
      )
      const response = await res.json()
      setTotalCalculations(response.data)
      console.log(response.data)
      // setIsLoad(false)
  }
  
  React.useEffect(() => {
    fetchTotalCalculations()
  }, []);










  var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const { data } = useDemoData({
  dataSet: 'Commodity',
  rowLength: 4,
  maxColumns: 6,
});

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    backgroundColor: 'transparent',
    devicePixelRatio: 4,
    title: {
      text: "Revenue Generated",
      fontColor: "#e6e6e6",
      labelFontColor: "#e6e6e6",
      fontFamily: "Tahoma",
      margin: 20,
      fontWeight: 600,
      fontSize: 20,
    },
    legend: {
      fontColor: "#e6e6e6"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      legendFontColor:"#e6e6e6",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      indexLabelFontWeight: 500,
      indexLabelFontColor: "#e6e6e6",
      dataPoints: [
        { y: 18, label: "Potato" },
        { y: 49, label: "Onion" },
        { y: 9, label: "Peas" },
        { y: 5, label: "Lettuce" },
        { y: 19, label: "Pumpkin" }
      ]
    }]
  }

  const options1 = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: 'transparent',
    devicePixelRatio: 4,
    title: {
      text: "Sales Over Month",
      fontColor: "#fff",
      labelFontColor: "#fff",
      fontFamily: "Tahoma",
      fontWeight: 600,
      margin: 30,
      fontSize: 20,
    },
    axisY: {
      title: "Sales Amount ( in Thousands )",
      titleFontColor: "#fff",
      labelFontColor: "#fff",
      fontSize: 13,
    },
    axisX:{
      labelFontColor: "#fff"
    },
    data: [
    {
      type: "area",
				name: "USD",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "৳ #,##0.## Thousands",
				dataPoints: [
					{ x: new Date("2017- 12- 01"), y: 67.515},
					{ x: new Date("2017- 11- 01"), y: 66.725},
					{ x: new Date("2017- 10- 01"), y: 64.86},
					{ x: new Date("2017- 09- 01"), y: 64.29},
					{ x: new Date("2017- 08- 01"), y: 64.51},
					{ x: new Date("2017- 07- 01"), y: 64.62},
					{ x: new Date("2017- 06- 01"), y: 64.2},
					{ x: new Date("2017- 05- 01"), y: 63.935},
					{ x: new Date("2017- 04- 01"), y: 65.31},
					{ x: new Date("2017- 03- 01"), y: 64.75},
					{ x: new Date("2017- 02- 01"), y: 64.49},
					{ x: new Date("2017- 01- 01"), y: 63.84}
				]
    }
    ]
  }

  
  return (
    
    <div className="business_analytics">
      <div className="w-layout-hflex frmr-total-calculations">
        <div className="frmr-total-expences">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" className="frmr-total-calc-icons"/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Cost</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.cost} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        <div className="frmr-total-sales">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" className="frmr-total-calc-icons"/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Revenue</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.revenue}<span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        <div className="total-revenue">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" className="frmr-total-calc-icons"/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Profit</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.profit}<span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        <div className="frmr-total-stocked">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/stock.png" loading="lazy" alt="" className="frmr-total-calc-icons"/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Stocked</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.stocked}<span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
      </div>

      <div className="ba-charts">

          
          <Stack direction='row' gap={2}>
          <div style={{ padding: '0 20px 20px', borderRadius: '10px', backgroundColor: '#223f3d', width: 'fit-content' }}>
                    <ReactApexChart options={topExpenseSectors.options} series={topExpenseSectors.series} type="pie" width={420} />
                </div>

                <div style={{ padding: '0 20px 20px', borderRadius: '10px', backgroundColor: '#223f3d', width: 'fit-content' }}>
                    <ReactApexChart options={topSellingProduct.options} series={topSellingProduct.series} type="bar" height={350} width={500} />

                </div>
          </Stack>


          


          
		
		
		
	



      </div>

    </div>
  )
}

export default BusinessAnalytics
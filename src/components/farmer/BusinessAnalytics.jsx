import { Stack } from '@mui/material';

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';


import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';






const BusinessAnalytics = (props) => {



  const [totalCalculations, setTotalCalculations] = React.useState(undefined)
  // const [projectData, setProjectData] = React.useState(undefined)
  // const [pieData, setPieData] = React.useState([])
  // let pieDataInit = [];


  const fetchTotalCalculations = async ()=>{

      const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: props.info?.user_id}),
      };

      const res = await fetch(
      '/api/get/total_calculations',
      postData
      )
      const response = await res.json()
      setTotalCalculations(response.data)
      console.log(response.data)
      // setIsLoad(false)


      
  }

//   const fetchPieData = async ()=>{

//     const postData1 = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({user_id: props.info?.user_id}),
//       };
  
//       const res1 = await fetch(
//       'http://localhost:3000/api/get/get_project_info_for_graph',
//       postData1
//       )
//       const response1 = await res1.json()
//       setProjectData(response1.data)
//       console.log(response1.data)
      
  
//       response1.data.map(row =>{
//         pieDataInit.push({ y: ((row.total_sales*100)/totalCalculations?.sales).toFixed(2) , label: row.product_name })
//       })
//       console.log(pieDataInit)
// }


  
  React.useEffect(() => {
    fetchTotalCalculations()
    // fetchPieData()
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
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '68px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Expenses</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.expense} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        <div className="frmr-total-sales">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '64px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Sales</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.sales} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        <div className="total-revenue">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '64px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Profit</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.revenue} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        {/* <div className="frmr-total-stocked">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/stock.png" loading="lazy" alt="" className="frmr-total-calc-icons"/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Stocked</h5>
              <h4 className="frmr-total-calc-h5">25,000 <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div> */}
      </div>

      <div className="ba-charts">

          
          <Stack direction='row' gap={2}>
          <div style={{backgroundColor: 'var(--color-bg-5)', padding:"15px",borderRadius:'10px', width: "fit-content"}}>
            <CanvasJSChart 
              options = {options1}
              containerProps = {{ fontColor: "#fff", width: '500px',height: '300px', color: '#fff' }}
            />
		      </div>

            <div style={{backgroundColor: 'var(--color-bg-5)', padding:"15px",borderRadius:'10px', width: "fit-content"}}>
              <CanvasJSChart options = {options}
                containerProps={{ fontColor: "#fff", width: '400px', height: '300px', color: '#fff' }}
              />
            </div>
          </Stack>


          


          
		
		
		
	



      </div>

    </div>
  )
}

export default BusinessAnalytics
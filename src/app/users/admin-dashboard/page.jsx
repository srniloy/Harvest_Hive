'use client'
import * as React from 'react'
import { Stack, Typography } from "@mui/material"
import ReactApexChart from 'react-apexcharts'
import UserContext from '@context/userContext'





const AdminDashboard = () => {
  const { tabOpened, setTabOpened } = React.useContext(UserContext)

  React.useEffect(() => {
    setTabOpened('Dashboard')
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








  return (
    <div style={{padding: '20px 30px'}}>
      <div className="w-layout-hflex frmr-total-calculations">

      <div className="frmr-total-expences">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/field.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '68px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Projects</h5>
              <h4 className="frmr-total-calc-h5">{0}</h4>
            </div>
          </div>
        </div>
        <div className="frmr-total-expences">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/lending.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '68px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Successful Transactions</h5>
              <h4 className="frmr-total-calc-h5">{0}</h4>
            </div>
          </div>
        </div>


        <div className="frmr-total-expences">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '68px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Expense</h5>
              <h4 className="frmr-total-calc-h5">{0} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        <div className="frmr-total-sales">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '64px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Revenue</h5>
              <h4 className="frmr-total-calc-h5">{0} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        <div className="total-revenue">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '64px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Profit</h5>
              <h4 className="frmr-total-calc-h5">{0} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        
      </div>

      <Stack direction='row' style={{marginTop: '20px'}}>
        <div className="total-revenue">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/average.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '64px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Average Profit Per Farmer</h5>
              <h4 className="frmr-total-calc-h5">{0} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
      </Stack>




    <div className="charts" style={{padding: '20px 0'}}>


      <div id="chart" style={{padding: '0 20px 20px', borderRadius: '10px', backgroundColor: '#223f3d', width: 'fit-content'}}>
        <ReactApexChart options={topExpenseSectors.options} series={topExpenseSectors.series} type="pie" width={420} />
      </div>




    </div>











    </div>
  )
}

export default AdminDashboard
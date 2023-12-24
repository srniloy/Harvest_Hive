'use client'
import React from 'react';
import { Button, Stack } from '@mui/material';
// import ExpenseTable from '@components/ExpenseTable';
import SellingTable from '@components/trader/SellingTable';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import '@styles/farmer-dashboard.css'
import { Suspense } from 'react';
import Loading from '../../loading';
import SlotTable from '@components/wholesaler/SlotTable';

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ProjectDetails = ({ params }) => {

  const [total, setTotal] = React.useState({ total_costs: '0', total_revenue: '0', total_stocked: '0', total_profit: '0', reload: false, render: false })
  const [stockSlotsInfo, setStockSlotsInfo] = React.useState([])
  const [slotSalesInfo, setSlotSalesInfo] = React.useState([])


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      editable: false,
      renderCell: (params) => {
        return (<Button onClick={() => alert("congratulation!")}>Done</Button>)
      }
    },
  ];




  const [tabContainer, setTabContainer] = React.useState([
    <Suspense fallback={<Loading />}>
      <SlotTable product={params.product} total={{ total, setTotal }} slotInfo={{ setStockSlotsInfo }} />
    </Suspense>
  ]);
  const [tabState, setTabState] = React.useState('Slots')

  const fpdTabClickAction = (e) => {
    e.preventDefault()
    const allTabs = document.querySelectorAll('.fpd-tab-link-container a');

    allTabs.forEach(element => {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    if (e.target.innerHTML == "Slots") {
      setTabContainer([
        <Suspense fallback={<Loading />}>
          <SlotTable product={params.product} total={{ total, setTotal }} slotInfo={{ setStockSlotsInfo }} />
        </Suspense>
      ]);
      setTabState("Slots");
    }
    else if (e.target.innerHTML == "Selling") {
      setTabContainer([
        <Suspense fallback={<Loading />}>
          <SellingTable product={params.product} total={{ total, setTotal }} slotInfo={{ stockSlotsInfo }} salesInfo={{ setSlotSalesInfo }} />
        </Suspense>
      ]);
      setTabState("Selling");
    }

  }


  const [openAddExpenseRow, setOpenAddExpenseRow] = React.useState(false);

  const handleClickOpenAddExpenseRow = () => {
    setOpenAddExpenseRow(true);
  };

  const handleCloseAddExpenseRow = () => {
    setOpenAddExpenseRow(false);
  };

  const [openAddSalesRow, setOpenAddSalesRow] = React.useState(false);

  const handleClickOpenAddSalesRow = () => {
    setOpenAddSalesRow(true);
  };

  const handleCloseAddSalesRow = () => {
    setOpenAddSalesRow(false);
  };


  const [addSalesData, setAddSalesData] = React.useState({
    quantity: '',
    price: '',
    status: 'Ready To Sell',
    slot_id: '',

  })

  const [slots, setSlots] = React.useState(undefined)

  React.useEffect(() => {
    const avgPrice = parseInt((stockSlotsInfo[slots - 1]?.amount + parseInt(stockSlotsInfo[slots - 1]?.transport_cost?.split(' ')[0])) / stockSlotsInfo[slots - 1]?.quantity)
    setAddSalesData(ex => ({
      ...ex,
      slot_id: stockSlotsInfo[slots - 1]?.slot_id,
      quantity: stockSlotsInfo[slots - 1]?.quantity,
      price: avgPrice,
    }))
  }, [slots])


  const addSales = async () => {
    console.log(addSalesData)
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addSalesData),
    };

    const res = await fetch(
      '/api/users/trader/add/add_trader_sales',
      postData
    )
    const response = await res.json()
  }



  return (
    <section class="frmr-project-detail-main">
      <div class="fpd-cover-img-box"
      >
        <div style={{ backgroundColor: '#00000050', height: '300px', width: '100%', position: 'absolute' }}></div>
        <img src={`/images/${params?.product.toLowerCase()}-cover.jpg`}

          style={{ height: '100%', width: '100%', objectFit: 'cover' }} alt="" srcset="" />
      </div>
      <div class="w-layout-blockcontainer fpd-other-part-container w-container">
        <h1 class="fpd-project-detail-heading">{params?.product} </h1>
        <div class="fpd-basic-info">
          {/* <div class="w-layout-hflex fpd-bi-flex fpd-project-info-top-bar">
            <div class="fpd-bi-info-item">
              <img src="/images/investing.png" loading="lazy" alt="" class="image-2" />
              <div class="fpd-bi-divider"></div>
              <div class="fpd-bi-item-value-wrapper">
                <h4 class="fpd-bi-item-h4">Product</h4>
                <div class="fpd-bi-item-value">Cabbage</div>
              </div>
            </div>
            <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2" />
              <div class="fpd-bi-divider"></div>
              <div class="fpd-bi-item-value-wrapper">
                <h4 class="fpd-bi-item-h4">Seedling</h4>
                <div class="fpd-bi-item-value">10000</div>
              </div>
            </div>
            <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2" />
              <div class="fpd-bi-divider"></div>
              <div class="fpd-bi-item-value-wrapper">
                <h4 class="fpd-bi-item-h4">Land</h4>
                <div class="fpd-bi-item-value">5 Acr</div>
              </div>
            </div>
            <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2" />
              <div class="fpd-bi-divider"></div>
              <div class="fpd-bi-item-value-wrapper">
                <h4 class="fpd-bi-item-h4">Starting Time</h4>
                <div class="fpd-bi-item-value">20 July, 2023</div>
              </div>
            </div>
          </div> */}
          <div class="w-layout-hflex fpd-total-calculations">
            <div class="fpd-calc-item">
              <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" class="fpd-total-calc-icons" />
                <div class="fpd-total-calc-text">
                  <h5 class="fpd-total-calc-h4">Total Costs</h5>
                  <h4 class="fpd-total-calc-h5">{parseInt(total.total_costs).toLocaleString('en-us')} <span class="fpd-total-calc-h5-span"></span></h4>
                </div>
              </div>
            </div>
            <div class="fpd-calc-item">
              <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/stock.png" loading="lazy" alt="" class="fpd-total-calc-icons" />
                <div class="fpd-total-calc-text">
                  <h5 class="fpd-total-calc-h4">Total Stocked</h5>
                  <h4 class="fpd-total-calc-h5">{parseInt(total.total_stocked).toLocaleString('en-us')} Kg</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-layout-hflex fpd-tab-link-container">
          <div className="fpd-tab-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div class="fpd-tab-link-wrapper">
              <a class="fpd-tab-link active" onClick={(e) => fpdTabClickAction(e)}>Slots</a>
            </div>
            {/* <div class="fpd-tab-link-wrapper">
              <a class="fpd-tab-link" onClick={(e) => fpdTabClickAction(e)}>Selling</a>
            </div> */}
          </div>
          <div className="fpd-table-action-buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30px', marginRight: '10px' }}>
            {
              tabState == 'Selling' ?
                (<Button variant='outline' onClick={() => { handleClickOpenAddSalesRow() }} style={{ color: '#fff', backgroundColor: '#ffffff22' }} startIcon={<AddIcon />}>Add Sales</Button>)
                : ('')
            }
          </div>
        </div>
        <div className="fpd-project-details-tab-container">

          {tabContainer}

        </div>
      </div>


      <Suspense fallback={<Loading />}>
        <Dialog
          open={openAddExpenseRow}
          onClose={handleCloseAddExpenseRow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add Expenses"}
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="Expense Sector"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="Measurement Unit"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="Cost"
                variant="outlined"
              />
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddExpenseRow}>Cancel</Button>
            <Button onClick={handleCloseAddExpenseRow} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>



        <Dialog
          open={openAddSalesRow}
          onClose={handleCloseAddSalesRow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add Sales"}
          </DialogTitle>
          <DialogContent>
            <form style={{ width: '410px' }}>
              <FormControl style={{ width: "400px", margin: "10px 5px" }}>
                <InputLabel id="demo-simple-select-label">Slot</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Slot"
                  value={slots}
                  onChange={(e) => {
                    setSlots(e.target.value)
                  }}
                >
                  {
                    stockSlotsInfo?.map((e, i) => {
                      if (e.status == 'Not Ready')
                        return (<MenuItem value={e.slot_id}>{e.slot_id}</MenuItem>)
                    })
                  }
                  {/* <MenuItem value={'Pending'}>1</MenuItem>
                  <MenuItem value={'Sold Out'}>2</MenuItem> */}
                </Select>
              </FormControl>

              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="number"
                label="Quantity (kg)"
                variant="outlined"
                value={parseInt(addSalesData.quantity)}
                onChange={(e) => {
                  setAddSalesData(ex => ({
                    ...ex,
                    quantity: e.target.value
                  }))
                }}
              />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="number"
                label="Price (per kg with transportation cost)"
                variant="outlined"
                value={parseInt(addSalesData.price)}
                onChange={(e) => {
                  setAddSalesData(ex => ({
                    ...ex,
                    price: e.target.value
                  }))
                }}
              />
              <FormControl style={{ width: "400px", margin: "10px 5px" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addSalesData.status}
                  label="Status"
                  onChange={(e) => {
                    setAddSalesData(ex => ({
                      ...ex,
                      status: e.target.value
                    }))
                  }}
                >
                  <MenuItem value={'Ready To Sell'}>Ready To Sell</MenuItem>
                  <MenuItem value={'Sold Out'}>Sold Out</MenuItem>
                </Select>
              </FormControl>

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddSalesRow}>Cancel</Button>
            <Button onClick={() => {
              handleCloseAddSalesRow()
              addSales()
            }} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>






















        <Dialog
          open={false}
          onClose={handleCloseAddSalesRow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add Sales"}
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="setgoal"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="goal description"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="Diversity catagory"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="Attribute"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="goal stage"
                variant="outlined"
              />
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddSalesRow}>Cancel</Button>
            <Button onClick={handleCloseAddSalesRow} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>

      </Suspense>

    </section >
  )
}



export default ProjectDetails






'use client'
import React from 'react';
import { Button } from '@mui/material';
import ExpenseTable from '@components/ExpenseTable';
import SellingTable from '@components/SellingTable';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import '@styles/farmer-dashboard.css'
import { Suspense } from 'react';
import Loading from '../loading';




const ProjectDetails = () => {
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
      renderCell: (params) =>{
        return (<Button onClick={()=>alert("congratulation!")}>Done</Button>)
      }
    },
  ];
  
  


  const [tabContainer, setTabContainer] = React.useState([
    <Suspense fallback={<Loading/>}>
      <ExpenseTable/>
    </Suspense>
    ]);
  const [tabState, setTabState] = React.useState('Expenses')

  const fpdTabClickAction = (e)=>{
    e.preventDefault()
    const allTabs = document.querySelectorAll('.fpd-tab-link-container a');

    allTabs.forEach(element => {
      if(element.classList.contains("active")){
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    if(e.target.innerHTML == "Expenses"){
      setTabContainer([
        <Suspense fallback={<Loading/>}>
          <ExpenseTable/>
        </Suspense>
      ]);
      setTabState("Expenses");
    }
    else if(e.target.innerHTML == "Selling"){
      setTabContainer([
        <Suspense fallback={<Loading/>}>
          <SellingTable/>
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




  return (
    <section class="frmr-project-detail-main">
    <div class="fpd-cover-img-box"></div>
    <div class="w-layout-blockcontainer fpd-other-part-container w-container">
      <h1 class="fpd-project-detail-heading">Cabbage </h1>
      <div class="fpd-basic-info">
        <div class="w-layout-hflex fpd-bi-flex fpd-project-info-top-bar">
          <div class="fpd-bi-info-item">
            <img src="/images/investing.png" loading="lazy" alt="" class="image-2"/>
            <div class="fpd-bi-divider"></div>
            <div class="fpd-bi-item-value-wrapper">
              <h4 class="fpd-bi-item-h4">Product</h4>
              <div class="fpd-bi-item-value">Cabbage</div>
            </div>
          </div>
          <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2"/>
            <div class="fpd-bi-divider"></div>
            <div class="fpd-bi-item-value-wrapper">
              <h4 class="fpd-bi-item-h4">Seedling</h4>
              <div class="fpd-bi-item-value">10000</div>
            </div>
          </div>
          <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2"/>
            <div class="fpd-bi-divider"></div>
            <div class="fpd-bi-item-value-wrapper">
              <h4 class="fpd-bi-item-h4">Land</h4>
              <div class="fpd-bi-item-value">5 Acr</div>
            </div>
          </div>
          <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2"/>
            <div class="fpd-bi-divider"></div>
            <div class="fpd-bi-item-value-wrapper">
              <h4 class="fpd-bi-item-h4">Starting Time</h4>
              <div class="fpd-bi-item-value">20 July, 2023</div>
            </div>
          </div>
        </div>
        <div class="w-layout-hflex fpd-total-calculations">
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Expenses</h5>
                <h4 class="fpd-total-calc-h5">135,000 <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Sales</h5>
                <h4 class="fpd-total-calc-h5">135,000 <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Revenue</h5>
                <h4 class="fpd-total-calc-h5">135,000 <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/stock.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Stocked</h5>
                <h4 class="fpd-total-calc-h5">135,000 <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-layout-hflex fpd-tab-link-container">
        <div className="fpd-tab-links" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div class="fpd-tab-link-wrapper">
            <a class="fpd-tab-link active" onClick={(e) => fpdTabClickAction(e)}>Expenses</a>
          </div>
          <div class="fpd-tab-link-wrapper">
            <a class="fpd-tab-link" onClick={(e) => fpdTabClickAction(e)}>Selling</a>
          </div>
        </div>
        <div className="fpd-table-action-buttons" style={{display:'flex', alignItems: 'center', justifyContent: 'center', height:'30px', marginRight: '10px'}}>
              <Button variant='outline' onClick={()=>{tabState == 'Expenses'? handleClickOpenAddExpenseRow(): handleClickOpenAddSalesRow()}} style={{color: '#fff', backgroundColor: '#ffffff22'}} startIcon={<AddIcon/>}>Add {tabState == 'Expenses'? 'Expense':'Sales'}</Button>
        </div>
      </div>
      <div className="fpd-project-details-tab-container">

      {tabContainer}
      
      </div>
    </div>


    <Suspense fallback={<Loading/>}>
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
                <form>
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Amount"
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Price (per kg)"
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Status"
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Collection Date"
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

  </section>
  )
}



export default ProjectDetails







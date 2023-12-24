import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { SubLoader } from '@app/loading';
import UserContext from '@context/userContext';


const columns = [
  { id: 'slot_id', label: 'Slot Id', align: 'center', minWidth: 100 },
  { id: 'seller_name', label: 'Seller Name', align: 'center', minWidth: 120 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'price',
    label: 'Price (per kg)',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'transport_cost',
    label: 'Transport Cost',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'total_amount',
    label: 'Total Amount',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'avg_price',
    label: 'Avg. Price (per kg)',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
];







const SlotTable = (props) => {
    const {user, setUser} = React.useContext(UserContext)
    const [isLoad, setIsLoad] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
      
    };

    const [expenseEditDialog, setExpenseEditDialog] = React.useState(false);
    const [expenseEditData, setExpenseEditData] = React.useState({});

    const handleClickOpen = (data) => {
        setExpenseEditDialog(true)
        setExpenseEditData(data)
    };

    const handleClose = () => {
        setExpenseEditDialog(false)
    };






    // =============================================================================================================


    let totalCost = 0;
    let totalStocked = 0;
    let slots = 0;
    const getTotalCost = ()=>{
      stockSlots?.forEach(element => {
        // row['amount']+parseInt(row['transport_cost'].split(' ')[0])
            totalCost += (element.amount+parseInt(element.transport_cost.split(' ')[0]));
            totalStocked += element.quantity;
      })
      
      props.total.setTotal(ex=>({
          ...ex,
          total_costs: totalCost,
          total_stocked: totalStocked
      }))



        // updateTotalExpense(props.project_id, totalCost)

        return totalCost.toLocaleString('en-us');
    }




    const [stockSlots, setStockSlots] = React.useState(undefined)


    const fetchStocks = async ()=>{
        const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.id,
          product: props?.product
        }),
        };
  
        const res = await fetch(
        '/api/users/wholesaler/get/get_stock_slots',
        postData
        )
        const response = await res.json()
        setStockSlots(response.data)
        props.slotInfo.setStockSlotsInfo(response.data)
        console.log(response.data)
        setIsLoad(false)
    }
    
    React.useEffect(() => {
        fetchStocks()
    }, []);


  



    const updateExpense = async ()=>{
        
          
          const postData = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseEditData),
          };
      
          const res = await fetch(
            '/api/update/expense_update',
            postData
          )
          const response = await res.json()
          console.log(response)
          props.total.setTotal(ex=>({
            ...ex,
            reload: true
        }))
          fetchExpenses()

      }

      const deleteExpense = async (data)=>{
        
          
        const postData = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
    
        const res = await fetch(
          '/api/delete/expense_delete',
          postData
        )
        const response = await res.json()
        console.log(response)
        fetchExpenses()
    }


     
    const updateTotalExpense = async (project_id, total_cost)=>{
        
          
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: project_id,
          total_expense: total_cost
        }),
      };
  
      const res = await fetch(
        '/api/update/total_expense_update',
        postData
      )
      const response = await res.json()
  }




    
  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
      <SubLoader open={isLoad}/>
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: '50px 0', backgroundColor: "transparent" }}>
            <TableContainer sx={{ maxHeight: 500, minHeight: 300 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor: "rgba(36, 68, 65, 0.946)"}}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockSlots
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            if(column.id == 'slot'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {++slots}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'status'){
                              if(row[column.id] == 'Ready To Sell'){
                                  return (
                                      <TableCell key={column.id} align={column.align}>
                                          <Button variant="outlined" color='success' style={{fontSize:'12px'}}>
                                              {row[column.id]}
                                          </Button>
                                      </TableCell>
                                  );
                              }
                              if(row[column.id] == 'Not Ready'){
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                        <Button variant="outlined" color='primary' style={{fontSize:'12px'}}>
                                            {row[column.id]}
                                        </Button>
                                    </TableCell>
                                );
                            }
                              if(row[column.id] == 'Processing'){
                                  return (
                                      <TableCell key={column.id} align={column.align}>
                                          <Button variant="outlined" color='warning' style={{fontSize:'12px'}}>
                                              {row[column.id]}
                                          </Button>
                                      </TableCell>
                                  );
                              }
                              else{
                                  return (
                                      <TableCell key={column.id} align={column.align}>
                                          <Button variant="outlined" color='error' style={{fontSize:'12px'}}>
                                              {row[column.id]}
                                          </Button>
                                      </TableCell>
                                  );
                              }
                          }
                            
                            else if(column.id == 'transport_cost'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {(parseInt(row[column.id].split(' ')[0])).toLocaleString('en-us')}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'total_amount'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {(row['amount']+parseInt(row['transport_cost'].split(' ')[0])).toLocaleString('en-us')}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'avg_price'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {((row['amount']+parseInt(row['transport_cost'].split(' ')[0]))/row['quantity']).toLocaleString('en-us')}
                                </TableCell>
                              );
                            }
                            else{
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                    <TableRow>
                        <TableCell colSpan={6}  style={{borderBottomWidth: '0px'}}/>
                        <TableCell key={'totalLabel'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> Total Cost </TableCell>
                        <TableCell key={'totalAmount'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> {
                            getTotalCost()
                        } </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8, 12, 16, 20]}
                component="div"
                count={stockSlots?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>



        <Dialog
        open={expenseEditDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Update Expenses"}
            </DialogTitle>
            <DialogContent>
                <form style={{width: '420px'}}>
                    <TextField
                    style={{ width: "400px", margin: "10px" }}
                    type="text"
                    value={expenseEditData.sector}
                    onChange={(e)=> {
                        setExpenseEditData(ex => ({
                        ...ex,
                        sector: e.target.value
                      }))
                    }}
                    label="Expense Sector"
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "10px" }}
                    type="number"
                    label="Measurement Unit"
                    value={expenseEditData.unit}
                    onChange={(e)=> {
                        setExpenseEditData(ex => ({
                        ...ex,
                        unit: e.target.value
                      }))
                    }}
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "10px" }}
                    type="number"
                    label="Cost"
                    value={expenseEditData.cost}
                    onChange={(e)=> {
                        setExpenseEditData(ex => ({
                        ...ex,
                        cost: e.target.value
                      }))
                    }}
                    variant="outlined"
                    />
                    <TextField
                    style={{ width: "400px", margin: "10px" }}
                    type="date"
                    value={expenseEditData.date}
                    onChange={(e)=> {
                        setExpenseEditData(ex => ({
                        ...ex,
                        date: e.target.value
                      }))
                    }}
                    label="Date"
                    focused
                    variant="outlined"
                    />
                    <br />
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=>{
              handleClose()
              updateExpense()
            }} autoFocus>
                Update
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default SlotTable
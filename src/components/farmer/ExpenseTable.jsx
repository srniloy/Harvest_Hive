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


const columns = [
    { id: 'sector', label: 'Expense Sector', align: 'left', minWidth: 120 },
    { id: 'date', label: 'Date', align: 'center', minWidth: 120 },
    { id: 'unit', label: 'Measurement Unit', align: 'center', minWidth: 100 },
    {
      id: 'cost',
      label: 'Cost',
      minWidth: 120,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
      {
        id: 'Actions',
        label: 'Actions',
        minWidth: 80,
        align: 'center',
      },
   
  ];
  







const ExpenseTable = (props) => {
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
    const getTotalCost = ()=>{
        expense?.forEach(element => {
            totalCost += element.cost;
        })
        props.total.setTotal(ex=>({
            ...ex,
            total_expense: totalCost
        }))

        updateTotalExpense(props.project_id, totalCost)

        return totalCost.toLocaleString('en-us');
    }




    const [expense, setExpense] = React.useState(undefined)


    const fetchExpenses = async ()=>{
        const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({project_id: props.project_id}),
        };
  
        const res = await fetch(
        '/api/get/get_expenses',
        postData
        )
        const response = await res.json()
        setExpense(response.data)
        console.log(response.data)
        setIsLoad(false)
    }
    
    React.useEffect(() => {
        fetchExpenses()
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
                        style={{ minWidth: column.minWidth, backgroundColor: "rgba(36, 68, 65, 0.946)" }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expense
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                                if(column.id == 'Date'){
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {row[column.id]}
                                    </TableCell>
                                    );
                                }
                                else if(column.id == 'Actions'){
                                  return(
                                      <TableCell key={column.id} align={column.align}>
                                      
                                      <IconButton aria-label="delete" onClick={()=>{
                                        deleteExpense(row)
                                      }} color='error'>
                                          <DeleteIcon />
                                      </IconButton>
                                      <IconButton aria-label="edit" color='primary' onClick={() => handleClickOpen(row)}>
                                          <EditIcon />
                                      </IconButton>
                                  </TableCell>
                                  )
                              }
                              else{
                                const value = row[column.id];
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
                        <TableCell colSpan={2}  style={{borderBottomWidth: '0px'}}/>
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
                count={expense?.length}
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

export default ExpenseTable
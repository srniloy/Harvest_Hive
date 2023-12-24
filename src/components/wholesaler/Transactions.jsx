import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import Data from '../../../public/Data';



const columns = [
  { id: 'order_id', label: 'Transaction ID', align: 'center', minWidth: 100 },
  { id: 'seller_name', label: 'Seller Name', align: 'center', minWidth: 120 },
  {
    id: 'product',
    label: 'Product',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 120,
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
    label: 'Price (Per KG)',
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
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];




const Transactions = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  
  const [transactionLists, setTransactionLists] = React.useState(undefined)


  const fetchData = async ()=>{
      const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: props.info.user_id}),
      };

      const res = await fetch(
      '/api/users/wholesaler/get/get_transaction_lists_for_trader',
      postData
      )
      const response = await res.json()
      setTransactionLists(response.data)
      // console.log(response.data)
      // setIsLoad(false)
  }
  
  React.useEffect(() => {
    fetchData()
  }, []);






  return (
    <div>
      
      <Paper className='transaction-table' sx={{ width: '100%', overflow: 'hidden', margin: '50px 0', backgroundColor: "transparent" }}>
            <TableContainer sx={{ maxHeight: 500, minHeight: '430px' }}>
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
                  {transactionLists
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            if(column.id == 'date'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row[column.id]}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'transport_cost'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {parseInt(row[column.id].split(' ')[0])}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'total_amount'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row['amount']+parseInt(row['transport_cost'].split(' ')[0])}
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
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[4, 8, 16]}
              component="div"
              count={transactionLists?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />



            
          </Paper>
    </div>
    



  );
}

export default Transactions
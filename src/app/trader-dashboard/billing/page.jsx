'use client';
import React from 'react'
import '@styles/billing.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Stack } from '@mui/material';
import TransportSelect from './transport-select/page';
import AppMap from '@components/AppMap';
import { ChakraProvider, theme } from '@chakra-ui/react'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Billing = () => {
    const router = useRouter()


  const [transportInfo, setTransportInfo] = React.useState(
    {
        type: '',
        from: '',
        to: '',
        distance: 0,
        cost: 0,
    }
  )
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = React.useState(true)

  if (data) {

  return (
    <section>
        <div class="container billing-page" style={{marginTop: '30px'}}>
            <h2 style={{color: '#f7c35f', marginLeft: '10px', marginBottom: '20px'}}>Order Procedure</h2>
        <div class="row">
            <div class="col-xl-8">

                <div class="card">
                    <div class="card-body">
                        <ol class="activity-checkout mb-0 px-4 mt-3">
                            
                            <li class="checkout-item">
                                <div class="avatar checkout-icon p-1">
                                    <div class="avatar-title rounded-circle bg-primary">
                                        <i class="bx bxs-truck text-white font-size-20"></i>
                                    </div>
                                </div>
                                <div class="feed-item-list">
                                    <div>
                                        <h5 class="font-size-18 mb-1">Transportation</h5>
                                        <p class="text-muted text-truncate mb-4">Select transport vehicle</p>
                                        <div class="mb-3" style={{display: 'flex', gap: '20px'}}>
                                            <Button variant='outlined' onClick={()=> setData(false)} color='primary' startIcon={<LocalShippingIcon color='primary'/>}>Add Transport</Button>
                                            <Button variant='outlined' color='primary' startIcon={<RemoveCircleIcon color='primary'/>}>Remove Transport</Button>

                                        </div>


                                            {
                                                transportInfo.from != ''? 
                                            
                                            <div class="col-lg-5 col-sm-6">
                                                <div data-bs-toggle="collapse">
                                                    <label class="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption1" class="card-radio-input"/>
                                                        <span class="card-radio py-3 text-truncate">
                                                            <Stack>
                                                            
                                                                <Typography><b>Vehicle: </b><span>{transportInfo.type}</span></Typography>
                                                                <Typography><b>From: </b><span>{transportInfo.from}</span></Typography>
                                                                <Typography><b>To: </b><span>{transportInfo.to}</span></Typography>
                                                                <Typography><b>Distance: </b><span>{transportInfo.distance}</span></Typography>
                                                                <Typography><b>Cost: </b><span>{transportInfo.cost}</span></Typography>
                                                            </Stack>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            : ''
                                            }

                                            





                                    </div>
                                </div>
                            </li>
                            <li class="checkout-item">
                                <div class="avatar checkout-icon p-1">
                                    <div class="avatar-title rounded-circle bg-primary">
                                        <i class="bx bxs-wallet-alt text-white font-size-20"></i>
                                    </div>
                                </div>
                                <div class="feed-item-list">
                                    <div>
                                        <h5 class="font-size-18 mb-1">Payment Info</h5>
                                        <p class="text-muted text-truncate mb-4">Duis arcu tortor, suscipit eget</p>
                                    </div>
                                    <div>
                                        <h5 class="font-size-14 mb-3">Payment method :</h5>
                                        <div class="row">
                                            <div class="col-lg-3 col-sm-6">
                                                <div data-bs-toggle="collapse">
                                                    <label class="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption1" class="card-radio-input"/>
                                                        <span class="card-radio py-3 text-center text-truncate">
                                                            <i class="bx bx-credit-card d-block h2 mb-3"></i>
                                                            Credit / Debit Card
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            <div class="col-lg-3 col-sm-6">
                                                <div>
                                                    <label class="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption2" class="card-radio-input"/>
                                                        <span class="card-radio py-3 text-center text-truncate">
                                                            <i class="bx bxl-paypal d-block h2 mb-3"></i>
                                                            Paypal
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-lg-3 col-sm-6">
                                                <div>
                                                    <label class="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption3" class="card-radio-input" checked=""/>

                                                        <span class="card-radio py-3 text-center text-truncate">
                                                            <i class="bx bx-money d-block h2 mb-3"></i>
                                                            <span>Cash on Delivery</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>

                
            </div>
            <div class="col-xl-4">
                <div class="card checkout-order-summary">
                    <div class="card-body">
                        <div class="p-3 mb-3" style={{backgroundColor: '#344c31', borderRadius: '10px'}}>
                            <h5 class="font-size-16 mb-0">Order Summary <span class="float-end ms-2">#MN0124</span></h5>
                        </div>
                        <div class="table-responsive order-table-wrapper">
                            <table class="table table-centered mb-0 table-nowrap order-table">
                                <thead>
                                    <tr>
                                        <th class="border-top-0" style={{width: '110px'}} scope="col">Product</th>
                                        <th class="border-top-0" scope="col">Quantity</th>
                                        <th class="border-top-0" scope="col">Per Kg</th>
                                        <th class="border-top-0" scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Tometo</th>
                                        <td>
                                            50 kg
                                        </td>
                                        <td>20</td>
                                        <td>1000</td>
                                    </tr>
                                    
                                    <tr>
                                        <td></td>
                                        <td colSpan="2">
                                            Sub Total :
                                        </td>
                                        <td>
                                            780
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="2">
                                            Transportation:
                                        </td>
                                        <td>
                                            {transportInfo.cost}
                                        </td>
                                    </tr>
                                                                
                                        
                                    <tr class="">
                                        <td></td>
                                        <td colSpan="2">
                                            Total:
                                        </td>
                                        <td>
                                            745.2
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', display:'flex', flexDirection:'row-reverse'}}>
                    <Button variant='contained' color='success'>Proceed</Button>
                </div>
            </div>

        </div>


        
        
    </div>
    
    </section>
  )
            }
        else{
            return(
                <div style={{height: '100vh', width: '100vw'}}>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                            onClick={() => setData(true)}
                            >
                            <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Select Transportation
                            </Typography>
                            <Button autoFocus onClick={() => router.push('/trader-dashboard/billing')} color="inherit">
                            Add
                            </Button>
                        </Toolbar>
                        </AppBar>
                        <div style={{height: '100%', width: '100%', overflow:'hidden'}}>

                        <ChakraProvider theme={theme}>
                            <AppMap  info= {{transportInfo, setTransportInfo}} />
                        </ChakraProvider>
                        </div>
                </div>
            )
        }
}

export default Billing
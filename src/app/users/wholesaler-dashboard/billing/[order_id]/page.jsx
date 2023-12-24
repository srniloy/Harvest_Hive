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
import { Stack, Tooltip } from '@mui/material';
import TransportSelect from '../transport-select/page';
import AppMap from '@components/trader/AppMap';
import { ChakraProvider, theme } from '@chakra-ui/react'
import PaymentsIcon from '@mui/icons-material/Payments';
import PaidIcon from '@mui/icons-material/Paid';





const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Billing = ({params}) => {
    const router = useRouter()

  const [addTransport, setAddTransport] = React.useState(false)


  React.useEffect(() => {
    if(addTransport){
        const checkout = document.querySelector('#transport')
        checkout?.classList.add('transportation-select')
    }
    else{
        const checkout = document.querySelector('#transport')
        checkout?.classList.remove('transportation-select')
    }
  }, [addTransport]);

/* 


*/

  const [transportInfo, setTransportInfo] = React.useState(
    {
        type: '',
        from: '',
        to: '',
        distance: 0,
        cost: '0',
    }
  )

  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };






//   ===================================              API CALLS            =======================================================================================

const [orderDetails, setOrderDetails] = React.useState()



const fetchData = async ()=>{
    const postData = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({order_id: params.order_id}),
    };

    const res = await fetch(
    '/api/users/wholesaler/get/get_order_info',
    postData
    )
    const response = await res.json()
    setOrderDetails(response.data)
    console.log(response.data)
    // setIsLoad(false)
}

React.useEffect(() => {
    fetchData()
}, []);






const confirmOrder = async ()=>{
    const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order_id: params.order_id,
            transportInfo: transportInfo,
            order_details: orderDetails
        }),
        };
    
        const res = await fetch(
        '/api/users/wholesaler/update/confirm_order',
        postData
        )
        const response = await res.json()
        // console.log(response.data)
        if(response.status == 200)
            router.push('/users/wholesaler-dashboard')
}









  const [mapDialog, setMapDialog] = React.useState(true)

  if (mapDialog) {

  return (
    <section>
        <div class="container billing-page" style={{marginTop: '30px'}}>
            <h2 style={{color: '#f7c35f', marginLeft: '10px', marginBottom: '20px'}}>Order Procedure</h2>
        <div class="row">
            <div class="col-xl-8">

                <div class="card">
                    <div class="card-body">
                        <ol class="activity-checkout mb-0 px-4 mt-3">
                            
                            <li class="checkout-item" id='transport'>
                                <div class="avatar checkout-icon p-1">
                                    <div class="avatar-title rounded-circle bg-primary">
                                        <LocalShippingIcon/>
                                    </div>
                                </div>
                                <div class="feed-item-list">
                                    <div>
                                        <h5 class="font-size-18 mb-1">Transportation</h5>
                                        <p class="text-muted text-truncate mb-4">Select transport vehicle</p>
                                        <div class="mb-3" style={{display: 'flex', gap: '20px'}}>
                                            <Button variant='outlined' onClick={()=> setMapDialog(false)} color='primary' startIcon={<LocalShippingIcon color='primary'/>}>Add Transport</Button>
                                            <Button variant='outlined' color='primary' startIcon={<RemoveCircleIcon color='primary'/>}
                                                onClick={()=>{
                                                    setAddTransport(false)
                                                    setTransportInfo(
                                                        {
                                                            type: '',
                                                            from: '',
                                                            to: '',
                                                            distance: 0,
                                                            cost: 0,
                                                        }
                                                    )
                                                }}
                                            >Remove Transport</Button>

                                        </div>


                                            {
                                                addTransport ? 
                                            
                                            <div class="col-lg-7 col-sm-6">
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
                                        <PaymentsIcon/>
                                    </div>
                                </div>
                                <div class="feed-item-list">
                                    <div>
                                        <h5 class="font-size-18 mb-1">Payment Info</h5>
                                        <p class="text-muted text-truncate mb-4">Select your preferable payment option</p>
                                    </div>
                                    <div>
                                        <h5 class="font-size-14 mb-3">Payment method :</h5>
                                        <div class="row">
                                            <div class="col-lg-3 col-sm-6">
                                                <div data-bs-toggle="collapse">
                                                    <label class="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption1" class="card-radio-input"/>
                                                        <span class="card-radio cash py-3 text-center text-truncate">
                                                            <i class="d-block h7 mb-3"><PaidIcon fontSize='large'/></i>
                                                            Cash
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            <div class="col-lg-3 col-sm-6">
                                                <div>
                                                {/* <Tooltip title={'Not available yet'}>

                                                    <label class="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption2" class="card-radio-input"/>
                                                        <span class="card-radio py-3 text-center text-truncate" style={{color: '#aaa !important', borderColor: '#aaa !important'}}>
                                                            Bkash
                                                        </span>
                                                    </label>
                                                    </Tooltip> */}

                                                </div>
                                            </div>

                                            <div class="col-lg-3 col-sm-6">
                                                <div>
                                                        {/* <Tooltip title={'Not available yet'}>
                                                    <label class="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption3" class="card-radio-input"/>

                                                        <span class="card-radio py-3 text-center text-truncate" style={{color: '#aaa !important', borderColor: '#aaa !important'}}>
                                                            Nogod
                                                        </span>
                                                    </label>
                                                        </Tooltip> */}
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
                            <h5 class="font-size-16 mb-0">Order Summary <span class="float-end ms-2">#{params.order_id}</span></h5>
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
                                            {orderDetails?.quantity} kg
                                        </td>
                                        <td>{orderDetails?.price}</td>
                                        <td>{orderDetails?.amount}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td></td>
                                        <td colSpan="2">
                                            Sub Total :
                                        </td>
                                        <td>
                                            {orderDetails?.amount}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="2">
                                            Transportation:
                                        </td>
                                        <td>
                                            {parseInt(transportInfo.cost?.split(' ')[0])}
                                        </td>
                                    </tr>
                                                                
                                        
                                    <tr class="">
                                        <td></td>
                                        <td colSpan="2">
                                            Total:
                                        </td>
                                        <td>
                                            {orderDetails?.amount+parseInt(transportInfo.cost?.split(' ')[0])}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', display:'flex', flexDirection:'row-reverse'}}>
                    <Button variant='contained' color='success'
                        onClick={()=>{
                            confirmOrder()
                            
                        }}
                    >Confirm</Button>
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
                            onClick={() => setMapDialog(true)}
                            >
                            <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Select Transportation
                            </Typography>
                            <Button autoFocus onClick={() => {
                                setAddTransport(true)
                                setMapDialog(true)
                            }} color="inherit">
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
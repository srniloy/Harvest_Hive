'use client'
import React from 'react';
import { Button, Stack, Typography } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import '@styles/farmer-dashboard.css'
import { Suspense } from 'react';
import Loading from '../../loading';
import BuyingTable from '@components/trader/BuyingTable';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';


const productsImg = [
  {label: 'Tometo', img: 'tometo.jpg', coverImg: 'tometo_cover.jpg'},
  {label: 'Onion', img: 'onion.jpg', coverImg: 'onion-cover.jpg'},
  {label: 'Eggplant'},
  {label: 'Carrots'},
  {label: 'Cabbage', img: 'image-asset.jpeg', coverImg: 'cabbage.jpg'},
  {label: 'Chilli'},
  {label: 'Watermelon'},
  {label: 'Potato', img: 'poteto.webp', coverImg: 'poteto-cover.jpg'},
]


const ProjectDetails = ({params}) => {
  
  const [product, setProducts] = React.useState({})
  const [user_id, product_id] = params.product_id.split('and')

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1d3133',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const fetchProjects = async ()=>{
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({project_id: product_id}),
    };

    const res = await fetch(
      'http://localhost:3000/api/get/project_details',
      postData
    )
    const response = await res.json()
    // setProjects(response.data)
    setProducts(response.data)
  }
  
  React.useEffect(() => {
    fetchProjects()
    
  }, []);

  const [user, setUser] = React.useState(undefined)

  const fetchUser = async ()=>{
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: user_id}),
    };

    const res = await fetch(
      'http://localhost:3000/api/get/projects_user_details',
      postData
    )
    const response = await res.json()
    // setProjects(response.data)
    setUser(response.data)
  }
  
  React.useEffect(() => {
    fetchUser()
    
  }, []);







  return (
    <section class="frmr-project-detail-main">
      <Suspense fallback={<Loading open={true}/>}> 


      <div class="fpd-cover-img-box">
      <div style={{backgroundColor: '#00000050', height: '300px', width: '100%', position: 'absolute'}}></div>
      <img src={`/images/${product?.cover_img}`}
      
      style={{height: '100%', width: '100%', objectFit: 'cover'}} alt="" srcset="" />
      </div>
      <div class="w-layout-blockcontainer fpd-other-part-container w-container">
        <h1 class="fpd-project-detail-heading" style={{marginTop: '10px'}}>{product?.title} </h1>
        <div class="fpd-basic-info" style={{marginTop: '50px', marginBottom: '50px'}}>
          <Stack direction={'row'} gap={'20px'}>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{backgroundColor: '#244441' ,
                  display: 'flex',
                  gap: '10px',
                  padding: '20px 30px',
                  borderRadius: '10px'
                  }}>
                    <InventoryIcon fontSize='large' style={{color: '#f7c35f'}}/>
                    <div>
                      <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Product Type</h6>
                      <p style={{margin: '0', color: '#eee'}}>{product?.product_name} </p>
                    </div>
                  </div>
                </div>



                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{backgroundColor: '#244441' ,
                  display: 'flex',
                  gap: '10px', 
                  padding: '20px 30px',
                  borderRadius: '10px'
                  }}>
                    <AccountBoxIcon fontSize='large' style={{color: '#f7c35f'}}/>
                    <div>
                      <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Farmer Name</h6>
                      <p style={{margin: '0', color: '#eee'}}>{user?.name}</p>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{backgroundColor: '#244441' ,
                  display: 'flex',
                  gap: '10px', 
                  padding: '20px 30px',
                  borderRadius: '10px'
                  }}>
                    <LocationOnIcon fontSize='large' style={{color: '#f7c35f'}}/>
                    <div>
                      <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Location</h6>
                      <p style={{margin: '0', color: '#eee'}}>{user?.address}</p>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{backgroundColor: '#244441' ,
                  display: 'flex',
                  gap: '10px', 
                  padding: '20px 30px',
                  borderRadius: '10px'
                  }}>
                    <CalendarMonthIcon fontSize='large' style={{color: '#f7c35f'}}/>
                    <div>
                      <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Experience</h6>
                      <p style={{margin: '0', color: '#eee'}}>5 days</p>
                    </div>
                  </div>
                </div>


                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{backgroundColor: '#244441' ,
                  display: 'flex',
                  gap: '10px', 
                  padding: '20px 30px',
                  borderRadius: '10px'
                  }}>
                    <ContactPhoneIcon fontSize='large' style={{color: '#f7c35f'}}/>
                    <div>
                      <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Phone Number</h6>
                      <p style={{margin: '0', color: '#eee'}}>{user?.phone}</p>
                    </div>
                  </div>
                </div>
          </Stack>
          <Grid container spacing={2}>

              


            <Grid xs={3}>
                
            </Grid>

            <Grid xs={3}>
                
            </Grid>

            <Grid xs={3}>
                
            </Grid>

            <Grid xs={3}>
                
            </Grid>
          </Grid>
        </div>
        <div class="w-layout-hflex fpd-tab-link-container">
          <div className="fpd-tab-links" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            
          <Typography variant='h5' style={{padding: '10px 20px', color: 'var(--yellow)', fontFamily: 'Roboto-bold'}}>Sales</Typography>
          </div>
        </div>
        <div className="fpd-project-details-tab-container">

        <BuyingTable product_id={product_id}/>
        
        </div>
      </div>
      </Suspense>



  </section>
  )
}



export default ProjectDetails







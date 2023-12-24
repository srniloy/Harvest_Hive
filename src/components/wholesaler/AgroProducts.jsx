import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import {Grid} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loader from '@app/loading';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import TextField from '@mui/material/TextField';
import { height } from '@mui/system';
import { SubLoader } from '@app/loading';


const productsImg = [
  {label: 'Tometo', img: 'tometo.jpg', coverImg: 'poteto-cover.jpg'},
  {label: 'Onion', img: 'onion.jpg', coverImg: 'onion-cover.jpg'},
  {label: 'Eggplant'},
  {label: 'Carrots'},
  {label: 'Cabbage', img: 'image-asset.jpeg', coverImg: 'cabbage.jpg'},
  {label: 'Chilli'},
  {label: 'Watermelon'},
  {label: 'Potato', img: 'poteto.webp', coverImg: 'poteto-cover.jpg'},
]



const AgroProducts = (props) => {
  const [loaderOpen, setLoaderOpen] = React.useState(true)
  const [isSubLoad, setIsSubLoad] = React.useState(true)

  const router = useRouter()







  const [products, setProducts] = React.useState(undefined)

  const [productFilterData, setProductFilterData] = React.useState({location:'',product:'', farmer: ''})


    const fetchProducts = async ()=>{
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const res = await fetch(
        '/api/users/wholesaler/get/get_products',
        postData
      )
      const response = await res.json()
      setProducts(response.data)
      console.log(response.data)
      setIsSubLoad(false)
    }

    const [locations, setLocations] = React.useState([]);
    const [productList, setProductList] = React.useState([]);
    const [farmersList, setFarmersList] = React.useState([]);
  
    const fetchLocations = async()=>{
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const res = await fetch(
        '/api/get/get_locations',
        postData
      )
      const response = await res.json()
      
      let tempLocations = []
      response.data.map(data =>{
        tempLocations.push({label: data.address})
      })
      setLocations(tempLocations)
    }
  
    const fetchProductNames = async()=>{
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const res = await fetch(
        '/api/get/get_product_names',
        postData
      )
      const response = await res.json()
      console.log(response)
      let tempProducts = []
      response.data.map(data =>{
        tempProducts.push({label: data.product_name})
      })
      setProductList(tempProducts)
    }

    const fetchFarmersName = async()=>{
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const res = await fetch(
        '/api/get/get_farmers_name',
        postData
      )
      const response = await res.json()
      console.log(response)
      let tempList = []
      response.data.map(data =>{
        tempList.push({label: data.name})
      })
      setFarmersList(tempList)
    }

    
    React.useEffect(() => {
      fetchProducts()
      fetchLocations()
      fetchProductNames()
      fetchFarmersName()
    }, []);



    const searchProducts =  async ()=>{
      console.log(productFilterData)
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productFilterData)
      };
  
      const res = await fetch(
        '/api/users/wholesaler/get/get_filtered_products',
        postData
      )
      const response = await res.json()
      
      setProducts(response.data)
    }




  return (
    <>



      <Stack direction='row' justifyContent='left' alignItems='center' gap={2} marginTop='15px'>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={locations}
          sx={{ width: 250 }}
          value={productFilterData.location}
          onChange={(e, v)=>{
            setProductFilterData(ex => ({
              ...ex,
              location: v?.label
            }))
          }}
          renderInput={(params) => <TextField {...params} variant='outlined' label="Location"/>}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={productList}
          sx={{ width: 250 }}
          value={productFilterData.product}
          onChange={(e,v)=>{
            setProductFilterData(ex => ({
              ...ex,
              product: v?.label
            }))
          }}
          renderInput={(params) => <TextField {...params} variant='outlined' label="Product" />}
        />
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={farmersList}
          sx={{ width: 250 }}
          value={productFilterData.farmer}
          onChange={(e, v)=>{
            setProductFilterData(ex => ({
              ...ex,
              farmer: v?.label
            }))
          }}
          renderInput={(params) => <TextField {...params} variant='outlined' label="Farmer" />}
        /> */}


        <Button variant="contained" style={{height: '50px'}} sx={{backgroundColor: "var(--yellow)", fontFamily:'Gothicb'}} startIcon={<PersonSearchIcon fontSize='large' />}
          onClick={()=>{
            searchProducts()
          }}
        >
          Search
        </Button>
      </Stack>



    <div className='styled-scrollbar' style={{marginTop: '10px', height: '470px', overflowY: 'scroll', padding: '20px',position:'relative'}}>
    
    <SubLoader open={isSubLoad}/>
    <Grid container gap={2}>

      {
        products?.map((product)=>{
          return (
            <Card sx={{ maxWidth: 280, backgroundColor: '#21391f', borderRadius: '20px' }}>
              <CardActionArea onClick={()=>{
                router.push('wholesaler-dashboard/agro-product-details/'+ product?.sales_id)
                setLoaderOpen(true)
              }}> 
                  <CardMedia
                    component="img"
                    height="180"
                    image={`/images/${product?.img}`}
                    alt="Product Image"
                    style={{
                      borderRadius: '20px'
                    }}
                  />
                  <CardContent>
                    <Typography style={{fontFamily: 'Roboto-Bold', fontWeight: 700}} variant="h5" component="div">
                      {product?.name}
                    </Typography>
                    <Typography variant="body2" letterSpacing={'.5px'} color="text.secondary">
                      <b>Quantity: </b>{product?.quantity} kg <br/>
                      <b>Price: </b>{product?.price} taka (per kg) <br/>
                      <b>Location</b> {product?.location}<br/>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align='right' style={{marginTop: '5px'}}>
                      By <Link href={'/farmer-dashboard'}> {product?.creator} </Link><br/>
                    </Typography>
                  </CardContent>
              </CardActionArea>
            </Card>
          )
        })
      }
        


        


      </Grid>


    </div>
    </>
  )
}

export default AgroProducts





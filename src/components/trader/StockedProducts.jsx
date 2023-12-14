import * as React from 'react';
import { Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '@app/loading';
import { SubLoader } from '@app/loading';

const StockedProducts = (props) => {
  const [projectFollow, setProjectFollow] = React.useState(false)
  const [loaderOpen, setLoaderOpen] = React.useState(true)


  const [products, setProducts] = React.useState(undefined)


    const fetchProducts = async ()=>{
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: props?.info.user_id}),
      };
  
      const res = await fetch(
        '/api/get/get_stocked_products',
        postData
      )
      const response = await res.json()
      setProducts(response.data)
      console.log(response.data)
      setLoaderOpen(false)
    }
    
    React.useEffect(() => {
      fetchProducts()
    }, []);

  const router = useRouter()
  return (
    <>
     
      <Grid  container gap={2}
      style={{
        marginTop: '50px',
        position: 'relative',
      }}>
        <SubLoader open={loaderOpen}/>
        {
          products?.map((product)=>{
            return (
              <Card sx={{ maxWidth: 280, backgroundColor: '#21391f', borderRadius: '20px' }}>
                <CardActionArea onClick={()=>{
                  // router.push('/trader-dashboard/stocked-product-details')
                  // setLoaderOpen(true)
                }}> 
                    <CardMedia
                      component="img"
                      height="180"
                      image={`/images/${product.img}`}
                      alt="Product Image"
                      style={{
                        borderRadius: '20px'
                      }}
                    />
                    <CardContent>
                      <Typography style={{fontFamily: 'Roboto-Bold', fontWeight: 700}} variant="h5" component="div">
                        {product?.product}
                      </Typography>
                      <Typography variant="body2" letterSpacing={'.5px'} color="text.secondary">
                        <b>Harvest Time: </b> {product?.harvest_time} <br/>
                        <b>Quantity: </b>{product?.quantity} kg <br/>
                        {/* <b>Last Update: </b>1d ago<br/> */}
                      </Typography>
                    </CardContent>
                </CardActionArea>
              </Card>
            )
          })
        }
        
      </Grid>
    </>
  )
}

export default StockedProducts
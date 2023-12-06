import * as React from 'react';
import { Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '@app/trader-dashboard/loading';

const StockedProducts = () => {
  const [projectFollow, setProjectFollow] = React.useState(false)
  const [loaderOpen, setLoaderOpen] = React.useState(false)

  const router = useRouter()
  return (
    <>
      <Loading open={loaderOpen} />
      <Grid 
      style={{
        marginTop: '50px',
      }}>
        <Card sx={{ maxWidth: 280, backgroundColor: '#21391f', borderRadius: '20px' }}>
          <CardActionArea onClick={()=>{
            router.push('/trader-dashboard/stocked-product-details')
            setLoaderOpen(true)
          }}> 
              <CardMedia
                component="img"
                height="180"
                image="/images/potatoes.jpg"
                alt="Product Image"
                style={{
                  borderRadius: '20px'
                }}
              />
              <CardContent>
                <Typography style={{fontFamily: 'Roboto-Bold', fontWeight: 700}} variant="h5" component="div">
                  Potato
                </Typography>
                <Typography variant="body2" letterSpacing={'.5px'} color="text.secondary">
                  <b>Product Type: </b> Potato <br/>
                  <b>Quantity: </b>50 kg <br/>
                  <b>Last Update: </b>1d ago<br/>
                </Typography>
              </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  )
}

export default StockedProducts
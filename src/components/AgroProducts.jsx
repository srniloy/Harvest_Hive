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
import Loading from '@app/trader-dashboard/loading';
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
  const [projectFollow, setProjectFollow] = React.useState(false)
  const [loaderOpen, setLoaderOpen] = React.useState(false)
  const [isSubLoad, setIsSubLoad] = React.useState(true)

  const router = useRouter()







  const [products, setProducts] = React.useState(undefined)


    const fetchProducts = async ()=>{
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const res = await fetch(
        'http://localhost:3000/api/get/get_products',
        postData
      )
      const response = await res.json()
      setProducts(response.data)
      console.log(response.data)
      setIsSubLoad(false)
    }
    
    React.useEffect(() => {
      fetchProducts()
    }, []);






  return (
    <>
      <Loading open={loaderOpen} />



      <Stack direction='row' justifyContent='left' alignItems='center' gap={2} marginTop='15px'>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} variant='outlined' label="Location" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} variant='outlined' label="Product" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} variant='outlined' label="Farmer" />}
        />


        <Button variant="contained" style={{height: '50px'}} sx={{backgroundColor: "var(--yellow)", fontFamily:'Gothicb'}} startIcon={<PersonSearchIcon fontSize='large' />}>
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
                router.push('/trader-dashboard/agro-product-details/'+ product?.user_id+ 'and'+product?.id)
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
                      <b>Harvest time: </b> {product?.harvest_time} <br/>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align='right' style={{marginTop: '5px'}}>
                      By <Link href={'/farmer-dashboard'}> {product?.creator} </Link><br/>
                    </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions style={{paddingBottom: '15px'}}>
                <Button size="small" variant='outlined' onClick={()=> projectFollow? setProjectFollow(false): setProjectFollow(true)} color="primary" style={{marginLeft: '15px', borderRadius: '5px'}}>
                  {projectFollow? 'Following' : 'Follow'}
                </Button>
              </CardActions>
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









const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];
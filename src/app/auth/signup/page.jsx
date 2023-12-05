'use client'
import React from "react";
import "@styles/signup.css";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Grid,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
  Select,
  MenuItem,
  Checkbox,
  CircularProgress,
} from "@mui/material";

import {
  Stack,
  TextField,
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useRouter } from "next/navigation";


import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';






const SignUp = () => {

  const router = useRouter()


  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const theme = createTheme({
    palette: {
      type: "dark", // Use the light color scheme
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };





  const [openTerms, setOpenTerms] = React.useState(false);

  const handleClickOpenTerms = () => {
    setOpenTerms(true);
  };
  const handleCloseTerms = () => {
    setOpenTerms(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));








  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const [SnackbarOpen, setSnackbarOpen] = React.useState(false);

  const SnackbarOpenHandleClick = () => {
    setSnackbarOpen(true);
  };

  const SnackbarOpenHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };


  const [submitLoading, setSubmitLoading] = React.useState(false);

// error warning info success

const alertType = {
  200: 'success',
  400: 'error',
  500: 'error',
  W: 'warning',
  I: 'info'
}

  const [alertData, setAlertData] = React.useState({
    type: 'error',
    message: 'This is a success message!',
  })



   const signupFormSubmit = async (formData)=>{
    const date = new Date();
    const data = {
      user_id: formData.get('user_type')[0] +date.valueOf(),
      name: formData.get('name'),
      user_type: formData.get('user_type'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      nid: formData.get('nid'),
      birth_date: formData.get('birth_date'),
      password: formData.get('password'),
    }

    console.log(formData.get('signup_term_check'))

    if(!(data.name != '' && data.user_type != '' && data.phone != '' && data.address != '' && data.nid != '' && data.birth_date != '' && data.password != '')){
      setAlertData({
        type: alertType.W,
        message: "Please fill the all informations"
      })
      SnackbarOpenHandleClick()
    }
    else if(!(data.password === formData.get('confirm_password'))){
      setAlertData({
        type: alertType.W,
        message: "Password doesn't match"
      })
      SnackbarOpenHandleClick()
    }
    else if(formData.get('signup_term_check') !== 'on'){
      setAlertData({
        type: alertType.I,
        message: "Please accept the terms and conditions"
      })
      SnackbarOpenHandleClick()
    }
    else{
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
  
      const res = await fetch(
        '/api/auth/signup',
        postData
      )
      const response = await res.json()
      console.log(response );
      setAlertData({
        type: alertType[response.status],
        message: response.message
      })
      SnackbarOpenHandleClick()
      if(response.status == 200){
        router.push('/auth/signin')
      }
    }


    
  



    setSubmitLoading(false)



  };
























  return (
    <>
      <section className="signup-container">
        <Stack direction="row" height="100vh" width="100vw">
          <div className="login-bg-img"></div>
          <div className="login-form-r2">
            <h3 className="sign-in-heading">
              Sign Up
            </h3>
            <div className="login-form-container">
              <Stack alignItems="center">
                <span className="bar"></span>
                <div className="login-form-wrapper">
                  <form className="login-form signup-form" action={signupFormSubmit} autoComplete="off" noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          className="phone-number"
                          variant="outlined"
                          label="Name"
                          name="name"
                          style={{ width: "100%" }}
                          placeholder="Enter your name..."
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth className="user-type-input">
                          <InputLabel id="demo-simple-select-label">
                            Sign up as
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Sign up as"
                            name="user_type"
                            onChange={handleChange}
                          >
                            <MenuItem value={'Farmer'}>Farmer</MenuItem>
                            <MenuItem value={'Trader'}>Trader</MenuItem>
                            <MenuItem value={'Wholesaler'}>Wholesaler</MenuItem>
                            <MenuItem value={'Retailer'}>Retailer</MenuItem>
                            <MenuItem value={'Admin'}>Admin</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth className="user-type-input">
                          <TextField
                            className="phone-number"
                            variant="outlined"
                            label="Phone"
                            name="phone"
                            placeholder="01880 205009"
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth className="user-type-input">
                          <TextField
                            variant="outlined"
                            type="text"
                            label="Address"
                            name="address"
                            placeholder="Enter your address"
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth className="user-type-input">
                          <TextField
                            variant="outlined"
                            type="phone"
                            label="NID"
                            name="nid"
                            placeholder="7854 3424 242"
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <ThemeProvider theme={theme}>
                        <FormControl fullWidth className="user-type-input">
                          <TextField
                            variant="outlined"
                            type="date"
                            label="Birth Date"
                            name="birth_date"
                            focused
                          />
                        </FormControl>
                        </ThemeProvider>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" className="password-box">
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                            name="password"

                          />
                        </FormControl>
                      </Grid>


                      <Grid item xs={6}>
                      <FormControl fullWidth variant="outlined" className="password-box">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                        name="confirm_password"

                      />
                    </FormControl>
                      </Grid>



                    </Grid>
                    

                    

                    

                    <Typography variant="body1" mt={1} display={"flex"} alignItems={'center'} color="#fff">
                    <Checkbox
                      
                      style={{color: '#F7C35F'}}
                      inputProps={{ 'aria-label': 'controlled' }} 
                      name="signup_term_check"
                    />
                    I AGREE WITH ALL 
                    <Link
                      variant="body1"
                      target="_blank"
                      marginLeft={1}
                      className="underline-on-hover"
                      style={{cursor: 'pointer'}}
                      onClick = {handleClickOpenTerms}
                    >
                      TERMS & CONDITION
                    </Link>
                  </Typography>
                    <Box textAlign="center" className="login-btn-box">
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={()=> setSubmitLoading(true)}
                        className="sign-in-submit-btn signup-submit-btn"
                        startIcon={ submitLoading ? <CircularProgress style={{height: '30px', width: '30px', color: '#000'}} /> : ''}
                      >
                        {
                          submitLoading? 'Creating...' : 'Sign up'
                        }
                      </Button>

                    </Box>
                  </form>
                  <Typography variant="body1" mt={5} color="#fff">
                    Already Have Account?
                    <Link
                      variant="body1"
                      marginLeft={1}
                      className="underline-on-hover"
                      style={{cursor: 'pointer'}}
                      onClick = {()=> router.push('/auth/signin')}
                    >
                      
                      SignIn
                    </Link>
                  </Typography>
                </div>
              </Stack>
            </div>
          </div>
        </Stack>
      </section>


      <Snackbar open={SnackbarOpen} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} autoHideDuration={4000} onClose={SnackbarOpenHandleClose}>
        <Alert onClose={SnackbarOpenHandleClose} severity={alertData.type} sx={{ width: '100%' }}>
          {alertData.message}
        </Alert>

      </Snackbar>


      <ThemeProvider theme={createTheme({palette: {mode: 'dark'}})}>

      <BootstrapDialog
        onClose={handleCloseTerms}
        aria-labelledby="customized-dialog-title"
        open={openTerms}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Terms and Conditions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseTerms}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{h6: {color: '#fff'}, p: {color: '#ccc', textAlign: 'justify'}}}>
          






       <h6> 1. Acceptance of Terms </h6>
      <p>By accessing or using the Agro Supply Chain Management Web App ("the App"), you agree to comply with and be bound by these terms and conditions.</p>

      <h6>2. Registration</h6>
      <p>
      a. Users must provide accurate and complete information during the registration process.
        <br/>
      b. Users are responsible for maintaining the confidentiality of their account credentials.
      </p>

      <h6>3. Use of the App</h6>
      <p>
      a. Users may use the App only for lawful purposes and in accordance with these terms.
          <br/>
      b. Users shall not engage in any activity that disrupts or interferes with the proper functioning of the App.
      </p>

      <h6>4. Data Privacy</h6>
      <p>
      a. We collect and process user data in accordance with our Privacy Policy.
          <br/>
      b. Users consent to the use of their data for the purpose of improving and enhancing the App's functionality.
      </p>

      

        </DialogContent>
      </BootstrapDialog>


      </ThemeProvider>








    </>
  );
};

export default SignUp;
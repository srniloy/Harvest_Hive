'use client'


import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  ThemeProvider,
  Typography,
  createTheme,
  Stack,
  TextField,
  FormControl,
  IconButton,
  Link,
  CircularProgress,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import "@styles/Signin.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Loader } from "@app/loading";













const Signin = () => {
  const router = useRouter()
  const [isLoad, setIsLoad] = React.useState(false);


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };


  const [openForgetPassword, setOpenForgetPassword] = React.useState(false);

  const handleClickOpenForgetPassword = () => {
    setOpenForgetPassword(true);
  };

  const handleCloseForgetPassword = () => {
    setOpenForgetPassword(false);
  };





  // const CssTextField = withStyles({
  //   root: {
  //     '& label.Mui-focused': {
  //       color: 'white',
  //     },
  //     '& .MuiInput-underline:after': {
  //       borderBottomColor: 'yellow',
  //     },
  //     '& .MuiOutlinedInput-root': {
  //       '& fieldset': {
  //         borderColor: 'white',
  //       },
  //       '&:hover fieldset': {
  //         borderColor: 'white',
  //       },
  //       '&.Mui-focused fieldset': {
  //         borderColor: 'yellow',
  //       },
  //     },
  //   },
  // })(TextField);



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

  const [submitLoading, setSubmitLoading] = React.useState(false);

  React.useEffect(() => {
    if(alertData.type == 'success'){
      setIsLoad(true)
    }
  }, [alertData]);




  const signinFormSubmit = async (formData)=>{
    const data = {
      phone: formData.get('phone'),
      password: formData.get('password'),
    }


    if(data.phone == '' && data.password == ''){
      setAlertData({
        type: alertType.W,
        message: "Please fill the all credentials"
      })
      SnackbarOpenHandleClick()
    }else{
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
  
      const res = await fetch(
        '/api/auth/signin',
        postData
      )
      const response = await res.json()
      const userUrl = {
        'Farmer': 'farmer-dashboard',
        'Trader': 'trader-dashboard',
        'Wholesaler': 'wholesaler-dashboard',
        'Retailer': 'retailer-dashboard',
        'Admin': 'admin-dashboard'
      }
      console.log(response)
      setAlertData({
        type: alertType[response.status],
        message: response.message
      })
      SnackbarOpenHandleClick()
  
      if(response.status == 200){
        router.push(`/users/${userUrl[response.user_data.user_type]}`)
      }

    }



    setSubmitLoading(false)


  };











  return (
    <>
      <Loader open={isLoad}/>
      <section className="login-container">
        <Stack direction="row" height="100vh" width="100vw">
          <div className="login-bg-img"></div>
          <div className="login-form-r2">
            <h3 className="sign-in-heading">
              Sign In
            </h3>
            <div className="login-form-container">
              <Stack alignItems="center">
                <span className="bar"></span>
                <div className="login-form-wrapper">
                  <form className="login-form" action={signinFormSubmit} autoComplete="off" noValidate>
                    <TextField
                      className="phone-number"
                      variant="outlined"
                      label="Phone"
                      name="phone"
                      placeholder="01880 205009"
                    />

                    <FormControl variant="outlined" className="password-box">
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

                    <Link
                      target="_blank"
                      color="inherit"
                      onClick={handleClickOpenForgetPassword}
                      className="underline-on-hover"
                      style={{cursor: 'pointer'}}
                    >
                      {" "}
                      Forget Password?
                    </Link>
                    <Box textAlign="center" className="login-btn-box">
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={()=> {setSubmitLoading(true)}}
                        className="sign-in-submit-btn"
                        startIcon={ submitLoading ? <CircularProgress style={{height: '30px', width: '30px', color: '#000'}} /> : ''}

                      >
                        {
                          submitLoading? 'Creating...' : 'Sign in'
                        }
                      </Button>

                    </Box>
                  </form>
                  <Typography variant="body1" mt={5} color="#fff">
                    Not registered?{" "}
                    <Link
                      variant="body1"
                      className="underline-on-hover"
                      style={{cursor: 'pointer'}}
                      onClick = {()=> {router.push('/auth/signup'); setIsLoad(true)}}
                    >
                      <span style={{color: '#F7C35F', textDecoration: 'none'}}>
                      Create an account
                      </span>
                    </Link>
                  </Typography>
                </div>
              </Stack>
            </div>
          </div>
        </Stack>
      </section>

      <Snackbar open={SnackbarOpen} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} autoHideDuration={4000} onClose={SnackbarOpenHandleClose}>
        <Alert onClose={SnackbarOpenHandleClose} severity={alertData.type} sx={{ width: '100%' }}>
          {alertData.message}
        </Alert>

      </Snackbar>


      <ThemeProvider theme={createTheme({palette: {mode: 'dark'}})}>

      <Dialog open={openForgetPassword} onClose={handleCloseForgetPassword}>
        <DialogTitle>Password Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            4 digit OTP will send to your phone number, Please fill it here and continue
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="OTP"
            type="text"
            fullWidth
            variant="outlined"
            style={{marginTop: '30px'}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForgetPassword}>Cancel</Button>
          <Button onClick={handleCloseForgetPassword}>Continue</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>










    </>
  );
};


export default Signin;
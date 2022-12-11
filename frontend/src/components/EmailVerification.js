import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GrYoga } from 'react-icons/gr';


const theme = createTheme();

const EmailVerification = () => {

  const history = useNavigate();

  const [user, setUser] = React.useState({
    userId:"",OTP:""
  })

  let userId,OTP;


  const HandleOTP = (event) => {
    console.log(event);
    userId = event.target.userId;
    OTP = event.target.OTP;

    setUser({userId,OTP});
    
  };

  const VerifyOTP = async(event) =>{
    event.preventDefault();

    const { userId, OTP } = user;

    const userOTP =await fetch('/api/user/verify-email',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            userId,
            OTP
          })
    });

    const otp = await userOTP.json();
    if(otp.status === 422 || !otp || userId.status === 422  || !userId){
      window.alert("Invalid OTP");
      console.log("Invalid Otp");
    }else{
      window.alert("verification Successful");
      console.log("Successful verified");

      history("/login");
    }
  }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <GrYoga/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Email Verification
          </Typography>
          <Box component="form" method='POST' sx={{ mt: 1 }}>
           
            <TextField
              margin="normal"
              required
              fullWidth
              name="OTP"
              label="Enter your OTP"
              type="OTP"
              id="OTP"
              autoComplete="current-OTP"
              onChange={HandleOTP}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={VerifyOTP}
            >
              Verify
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default EmailVerification
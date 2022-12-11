import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TbYoga } from 'react-icons/tb';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Yoga Class
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Register = () => {

  const history = useNavigate();

  const [user, setUser] = React.useState({
    name:" ",email:" ",phoneNumber:" ",gender:" ",age:" ",company:" ",password:" "
  })

  let name,value;


  const handleInput = (event) => {
    console.log(event);
    name = event.target.name;
    value = event.target.value;

    setUser({...user,[name]:value});
    
  };

  const PostUserData = async(event) =>{
    event.preventDefault();

    const { name ,email ,phoneNumber ,gender ,age ,company ,password } = user;

    const userData =await fetch('/api/user/create',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            name,
            email,
            phoneNumber,
            gender,
            age,
            company,
            password
          })
    });

    const data = await userData.json();
    if(data.status === 422 || !data){
      window.alert("Registration Failed");
      console.log("Invalid Rgstration");
    }else{
      window.alert("Registration Success");
      console.log("Successful Rgstration");

      history("/login");
    }
  }

  



  return (
    <>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <TbYoga />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box component="form" method='POST' sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={handleInput}
              value={user.name}
              autoComplete="name"
              autoFocus
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleInput}
              autoComplete="email"
              value={user.email}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              onChange={handleInput}
              value={user.phoneNumber}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
              onChange={handleInput}
              value={user.gender}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              autoComplete="age"
              onChange={handleInput}
              value={user.age}
              
            />
            <TextField
              margin="normal"
              fullWidth
              id="company"
              label="Company"
              name="company"
              autoComplete="company"
              onChange={handleInput}
              value={user.company}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Create Password"
              type="password"
              id="password"
              autoComplete="create-password"
              onChange={handleInput}
              value={user.password}
            />

            <Button
              type="submit"
              value="register"
              onClick={PostUserData}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  )
}

export default Register
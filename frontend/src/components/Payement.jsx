import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GrYoga } from 'react-icons/gr';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const theme = createTheme();

const Payement = () => {

  const [batch, setBatch] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleChange = (event) => {
    event.preventDefault();
    setBatch(event.target.value);
  };

  const handleuserId = (event) => {
    event.preventDefault();
    setUserId(event.target.value);
  };

  const handleEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userId: data.get('userId'),
      email: data.get('email'),
      batch: data.get('batch'),
    });
  };



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
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <GrYoga/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Book Your Slot For Yoga 
          </Typography>
          </div>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="userId-label">User ID</InputLabel>
              <Select 
              labelId="userId-select"
              id="userId"
              value={userId}
              name="userId"
              required
              label="User Id"
              fullWidth
              onChange={handleuserId}
              >
                <MenuItem value={'6394ed85d905c4b9e5034d14'}>6394ed85d905c4b9e5034d14</MenuItem>
              </Select>
            </FormControl>
           
            


            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="email-label">Email</InputLabel>
              <Select 
              labelId="email-select"
              id="email"
              value={email}
              name="email"
              required
              label="Email"
              onChange={handleEmail}
              >
                <MenuItem value={'syed.nlp00@gmail.com'}>syed.nlp00@gmail.com</MenuItem>
              </Select>
            </FormControl>




            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="batch-select-label">Select your batch</InputLabel>
              <Select 
              labelId="batch-label"
              id="batch-select"
              value={batch}
              required
              label="Select your batch"
              onChange={handleChange}
              autoFocus
              >
                
                <MenuItem value={"6-7AM"}>6 to 7 AM</MenuItem>
                <MenuItem value={"7-8AM"}>7 to 8 AM</MenuItem>
                <MenuItem value={"8-9AM"}>8 to 9 AM</MenuItem>
                <MenuItem value={"5-6PM"}>5 to 6 PM</MenuItem>
              </Select>
            </FormControl>



            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Payement
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Payement
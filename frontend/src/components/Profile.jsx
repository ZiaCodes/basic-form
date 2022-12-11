import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { GrYoga } from 'react-icons/gr';
import Divider from '@mui/material/Divider';
import {MdAlternateEmail} from 'react-icons/md'
import {RiBuilding2Fill} from 'react-icons/ri'
import {RiGenderlessFill} from 'react-icons/ri'
import {FcCellPhone} from 'react-icons/fc'

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const printForm = () =>{
    window.print();
}

const Profile = () => {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        height:'100vh',
    }}>
        <List
      sx={{
        width: '100%',
        maxWidth: 460,
        bgcolor: 'background.paper',
        boxShadow:'5px 5px 5px rgba(0,0,0,0.1)',
        border:'0.5px solid rgba(0,0,0,0.1)',
        borderTop:'2px solid blue',
        borderRadius:'5px'
      }}
    >
      <ListItem>
        <ListItemText primary="Syed Ziauddin" secondary="14th Nov, 1998" />
      </ListItem>
      <Divider component="li" />
      
      <ListItem >
        <ListItemText primary="Gym Membership validity" secondary="Jan 7, 2023" />
      </ListItem>
      <Divider component="li" variant="inset" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <GrYoga />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Batch" secondary="7 to 8 AM" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FcCellPhone />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Contact" secondary="8918027179" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MdAlternateEmail style={{color:'black'}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Email" secondary="Syed.nlp00@gmail.com" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <RiGenderlessFill style={{color:'black'}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Gender" secondary="Male" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <RiBuilding2Fill style={{color:'black'}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Company" secondary=" Syed & Sons " />
      </ListItem>

        <div >
        <Tooltip title="edit form" edit>
        <Button>Edit</Button>
        </Tooltip>

        <Tooltip title="Print the form" print>
        <Button onClick={printForm}>Print</Button>
        </Tooltip>
        </div>
    </List>


    </div>
  )
}

export default Profile
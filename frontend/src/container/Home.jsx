import React from 'react'
import Payement from '../components/Payement';
import Profile from '../components/Profile';

const isPayementVerified = 'false';

const UserProfile = () =>{
  if(isPayementVerified==='true')
    return(
      <Payement/>
    );
  else
      return(
        <Profile/>
      );
}
const Home = () => {
  return (
    <div>
      <UserProfile/>
    </div>
  )
}

export default Home
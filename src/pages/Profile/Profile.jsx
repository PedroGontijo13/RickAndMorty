import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 1rem 2rem;
`;

const Profile = () => {
  const nagivate = useNavigate();
  const user = useSelector((state) => state.user.user);

  // useEffect(() => {
  //   if(!user){
  //     nagivate("/login");
  //   }
  // }, [])

  return (
    <ProfileContainer>
      <h1>{user && user.user.fullName}</h1>
      <h1>{user && user.user.email}</h1>
    </ProfileContainer>
  )
}

export default Profile
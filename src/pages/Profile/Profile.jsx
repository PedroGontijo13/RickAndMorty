import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { getMe } from '../../reducers/userSlice';
import axios from 'axios';

const ProfileContainer = styled.div`
  padding: 1rem 2rem;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if(isLoggedIn){
      dispatch(getMe())
    }

    console.log(user);
  }, [dispatch])

  const handleDeleteCharacter = async (id) => {
    await axios.delete(import.meta.env.VITE_APP_URL + `/api/character/`, { id });

    let favArr = JSON.parse(localStorage.getItem("characterFavs"));
    favArr = favArr.filter((character) => character.id !== id);
    localStorage.setItem("characterFavs", JSON.stringify(favArr));
  }

  return (
    <ProfileContainer>
      <h1>{user && user.user.fullName}</h1>
      <h1>{user && user.user.email}</h1>

      {
        user && user.user.favCharacters.map((character) => {
          return <div key={character.id}>{character.name} <button onClick={() => handleDeleteCharacter()}>Remove</button></div>
        })
      }
    </ProfileContainer>
  )
}

export default Profile
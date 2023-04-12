import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const CharacterCardContainer = styled.div`
  position: relative;
  img{
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.8));
    border-radius: 8px;
  }
  transition: all 0.3s ease-in-out;
  &:hover{
    transform: scale(1.05);
  }
`;

const CharacterInformation = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CharacterAction = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  button{
    border:none;
    padding: 10px 12px;
    border-radius: 8px;
    background: rgba(0,0,0,0.7);
    cursor: pointer;
    min-width: auto;
    max-width: auto;
  }
`;

const FavButton = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  border:none;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(0,0,0,0.7);
  cursor: pointer;
  width: 50px;
  height: 40px;
  svg {
    font-size: 1.3rem;
  }
`;

const CharacterCard = ({ id, image, name, status, species, gender, origin }) => {
  const [isFavorites, setIsFavorites] = useState(localStorage.getItem("characterFavs") || []);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate();

  const handleRoute = (id) => {
    navigate(`/character/${id}`);
  }

  useEffect(() => {
    if(localStorage.getItem("characterFavs")) setIsFavorites(JSON.parse(localStorage.getItem("characterFavs")));
  }, []);

  const setFavoriteCharacter = async (id) => {
    const characterData = {
      id,
      name,
      image,
      status,
      species,
      gender
    }
    await axios.post(import.meta.env.VITE_APP_URL + "/api/character", characterData);
    alert("Character added to favorites");
    localStorage.setItem("characterFavs", JSON.stringify([...isFavorites, id]));
    setIsFavorites([...isFavorites, id]);
    // logic to set favorite character
  };
  
  return (
    <CharacterCardContainer>
        <img src={image} alt={name + "-image"} />
        <div className='overlay'></div>
        <CharacterInformation>
            <h3>{name}</h3>
            <p>Is alive: {status}</p>
            <p>Species: {species}</p>
            <p>Gender: {gender}</p>
            <p>Origin: {origin.name}</p>
        </CharacterInformation>
        <CharacterAction>
          <button onClick={() => handleRoute(id)}>See more</button>
        </CharacterAction>
        {isLoggedIn && !isFavorites.includes(id) && <FavButton onClick={() => setFavoriteCharacter(id)}><AiOutlineHeart /></FavButton>}
    </CharacterCardContainer>
  )
}

export default CharacterCard;
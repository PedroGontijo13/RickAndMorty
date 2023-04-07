import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  button{
    border:none;
    padding: 10px 12px;
    border-radius: 8px;
    background: rgba(0,0,0,0.7);
    cursor: pointer;
  }
`;




const CharacterCard = ({ id, image, name, status, species, gender, origin }) => {

  const navigate = useNavigate();

  const handleRoute = (id) => {
    navigate(`/character/${id}`);
  }
  
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
    </CharacterCardContainer>
  )
}

export default CharacterCard;
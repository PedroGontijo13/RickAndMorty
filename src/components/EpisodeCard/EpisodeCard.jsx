import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const colors = ["#231F20", "#BB4430", "#7EBDC2", "#F3DFA2", "#EFE6DD"]

const EpisodeCardContainer = styled.div`
  position: relative;
  height: 300px;
  transition: all 0.3s ease-in-out;
  &:hover{
    transform: scale(1.05);
  }
`;

const OverlayContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: ${props => `linear-gradient(180deg, ${colors[Math.floor(Math.random() * colors.length)]}, rgba(0,0,0,0.1) 100%)`};
    border-radius: 8px;
`;

const EpisodeInformation = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EpisodeAction = styled.div`
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


const EpisodeCard = ({ id, name, air_date, episode, characters, url }) => {

  const navigate = useNavigate();

  const handleRoute = (id) => {
    // navigate(`/Episode/${id}`);
  }
  
  return (
    <EpisodeCardContainer>
        {/* <img src={image} alt={name + "-image"} /> */}
        <OverlayContainer ></OverlayContainer>
        <EpisodeInformation>
            <h3>{name}</h3>
            <p>Air Date: {air_date}</p>
            <p>Episode: {episode}</p>
            <p>Characters: {characters.length}</p>
        </EpisodeInformation>
        <EpisodeAction>
          <button onClick={() => handleRoute(id)}>See more</button>
        </EpisodeAction>
    </EpisodeCardContainer>
  )
}

export default EpisodeCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  background-color: black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  border-radius: 8px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const EpisodeCard = ({ id, name, airDate, episode }) => {
  const navigate = useNavigate()

  const handleRoute = (id) => {
    navigate(`/episode/${id}`);
  }
  return (
    <CardContainer onClick={() => handleRoute(id)}>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardText>Air Date: {airDate}</CardText>
        <CardText>Episode: {episode}</CardText>
      </CardContent>
    </CardContainer>
  );
};

export default EpisodeCard;

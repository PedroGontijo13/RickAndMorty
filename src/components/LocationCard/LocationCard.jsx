import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background-color: black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  img {
    width: 100%;
  }
`;

const Container = styled.div`
  padding: 10px;
`;
const LocationCard = ({ name, type, dimension, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/location/${id}`);
  };
  return (
    <Card onClick={handleClick}>
      <Container>
        <h4>
          <b>{name}</b>
        </h4>
        <p>{type ?? "Unknow"}</p>
        <p>{dimension ?? "Unknow"}</p>
      </Container>
    </Card>
  );
};

export default LocationCard;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Locations = () => {
  const { id } = useParams(); // retrieve character id from URL parameter
  const [location, setLocation] = useState(null); //
  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${id}`
      );
      const data = await response.json();
      setLocation(data);
    };
    fetchLocation();
  }, [id]);
  return (
    <LocationContainer>
      {location ? (
        <>
          <h3>{location.name}</h3>
          <p>Type: {location.type}</p>
          <p>Dimension: {location.dimension}</p>
        </>
      ) : (
        <p>Loading</p>
      )}
    </LocationContainer>
  );
};

export default Locations;

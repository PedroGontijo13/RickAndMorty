import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 16px;
  }

  .residents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 16px;
    justify-items: center;
    align-items: center;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const ResidentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 16px;
  justify-items: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Locations = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${id}`
      );
      const data = await response.json();
      setLocation(data);

      // fetch residents data
      const residentsData = await Promise.all(
        data.residents.map(async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          return data;
        })
      );
      setResidents(residentsData);
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
          <h4>Residents:</h4>
          <ResidentsContainer>
            {residents.map((resident) => (
              <CharacterCard
                key={resident.id}
                id={resident.id}
                name={resident.name}
                image={resident.image}
                status={resident.status}
                species={resident.species}
                gender={resident.gender}
                origin={resident.origin}
              />
            ))}
          </ResidentsContainer>
        </>
      ) : (
        <p>Loading</p>
      )}
    </LocationContainer>
  );
};

export default Locations;

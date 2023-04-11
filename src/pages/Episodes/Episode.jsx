import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
const EpisodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 16px;
  }

  .Characters-grid {
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

const CharactersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 16px;
  justify-items: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Episode = () => {
  const { id } = useParams();
  const [Episode, setEpisode] = useState(null);
  const [Characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchEpisode = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      const data = await response.json();
      setEpisode(data);

      // fetch Characters data
      const CharactersData = await Promise.all(
        data.characters.map(async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          return data;
        })
      );
      setCharacters(CharactersData);
    };
    fetchEpisode();
  }, [id]);
  return (
    <EpisodeContainer>
      {Episode ? (
        <>
          <h3>{Episode.name}</h3>
          <p>name: {Episode.name}</p>
          <p>air_date: {Episode.air_date}</p>
          <p>episode: {Episode.episode}</p>
          <h4>Characters:</h4>
          <CharactersContainer>
            {Characters.map((resident) => (
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
          </CharactersContainer>
        </>
      ) : (
        <p>Loading</p>
      )}
    </EpisodeContainer>
  );
};

export default Episode;

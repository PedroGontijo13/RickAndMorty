import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const CharacterPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;

  max-width: 1100px;
  margin: 0 auto;
`;

const CharacterImageContainer = styled.div`
  img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
  padding: 1rem 2rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #fff;
  margin: 1rem 0;
`;

const InformationCard = styled.div``;

const EpisodeContainer = styled.div`
  width: 100%;
`;

const EpisodesCard = styled.div`
  border: 1px solid #dedede;
  border-radius: 6px;
  padding: 1rem;
`;

const EpisodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const ColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Character = () => {
  const [character, setCharacter] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_RAM_URL + `/character/${id}`)
      .then((res) => {
        setCharacter(res.data);
        getEpisodes(res.data.episode);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const getEpisodes = (episodes) => {
    const episodeRequests = episodes.map((episode) => axios.get(episode));

    Promise.all(episodeRequests)
      .then((data) => {
        const episodeData = data.map((episode) => {
          return {
            id: episode.data.id,
            name: episode.data.name,
            air_date: episode.data.air_date,
            episode: episode.data.episode,
          };
        });
        setEpisodes(episodeData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CharacterPageContainer>
      <CharacterImageContainer>
        {
          character.image ? (<img src={character.image} alt={character.name} />) : (<h1>Loading..</h1>)
        }
        
      </CharacterImageContainer>
      <h1>{character.name}</h1>
      <Line />
      <ColumnWrapper>
        <InformationCard>
          <h2>Character Information</h2>
          <Line />
          <p>
            <b>Gender:</b> {character.gender}
          </p>
          <p>
            <b>Location:</b> {character.location && character.location.name}
          </p>
          <p>
            <b>Origin:</b> {character.origin && character.origin.name}
          </p>
          <p>
            <b>Species:</b> {character.species}
          </p>
          <p>
            <b>Status:</b> {character.status}
          </p>
          <p>
            <b>Type:</b> {character.type ? character.type : "No type"}
          </p>
        </InformationCard>
        <EpisodeContainer>
          <h2>Episodes</h2>
          <Line />
          <EpisodeList>
            {episodes.length > 0 &&
              episodes.map((episode) => (
                <EpisodesCard>
                  <p>
                    <b>Name:</b> {episode.name}
                  </p>
                  <p>
                    <b>Episode:</b> {episode.episode}
                  </p>
                  <p>
                    <b>Air Date:</b> {episode.air_date}
                  </p>
                </EpisodesCard>
              ))}
          </EpisodeList>
        </EpisodeContainer>
      </ColumnWrapper>
    </CharacterPageContainer>
  );
};

export default Character;

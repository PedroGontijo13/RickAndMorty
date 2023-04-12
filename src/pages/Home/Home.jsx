import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCharacters,
  fetchEpisodes,
  fetchLocations,
} from "../../reducers/ramSlice";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import LocationCard from "../../components/LocationCard/LocationCard";
import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";

const HomeContainer = styled.div`
  padding: 1rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: start;
  }
`;

const ContainerLayout = styled.div`
  display: grid;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  text-align: center;
`;

const TitleSection = styled.h1`
  width: 100%;
  font-size: 3rem;
  border-bottom: 1px solid #fff;
  padding-bottom: 1rem;
  margin: 1.4rem 0;
`;

const LocationLayout = styled.div`
  display: grid;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EpisodeLayout = styled.div`
  display: grid;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ram.isLoading);
  const characters = useSelector((state) => state.ram.characters);
  const locations = useSelector((state) => state.ram.locations);
  const episodes = useSelector((state) => state.ram.episodes);

  useEffect(() => {
    dispatch(fetchCharacters());
    dispatch(fetchLocations());
    dispatch(fetchEpisodes());
  }, [dispatch]);

  return (
    <HomeContainer>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <TitleSection>Characters</TitleSection>
          <ContainerLayout>
            {characters.length > 0 &&
              characters
                .slice(0, 6)
                .map((character) => (
                  <CharacterCard key={character.id} {...character} />
                ))}
          </ContainerLayout>
          <TitleSection>Location</TitleSection>
          <ContainerLayout>
            {locations.slice(0, 6).map((location) => (
              <LocationCard key={location.id} {...location} />
            ))}
          </ContainerLayout>

          <TitleSection>Episodes</TitleSection>
          <ContainerLayout>
            {episodes.slice(0, 6).map((episode) => (
              <EpisodeCard key={episode.id} {...episode} />
            ))}
          </ContainerLayout>
        </>
      )}
    </HomeContainer>
  );
};

export default Home;

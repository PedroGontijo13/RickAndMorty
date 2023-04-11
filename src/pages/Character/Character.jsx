import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CharacterDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await response.json();
      setCharacter(data);
    };
    fetchCharacter();
  }, [id]);

  // render character information when data is loaded
  return (
    <CharacterDetailContainer>
      {character ? (
        <>
          <img src={character.image} alt={character.name} />
          <h1>{character.name}</h1>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </CharacterDetailContainer>
  );
};

export default Character;

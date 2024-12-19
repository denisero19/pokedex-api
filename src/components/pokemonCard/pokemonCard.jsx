import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

function PokemonCard({ pokemon }) {
    const mainType = pokemon.types[0];
    return (
        <Link to={`/pokemon/${pokemon.id}`}>
            <PokemonCardCasing type={mainType}>
                <h3>{pokemon.name}</h3>
                <PokemonImage src={pokemon.image} alt={pokemon.name} />
                <div>
                    {pokemon.types.map((type, index) => (
                        <PokemonType key={index}>{type}</PokemonType>
                    ))}
                </div>
            </PokemonCardCasing>
        </Link>
    );
}

export default PokemonCard;

const PokemonCardCasing = styled.div`
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  text-align: center;
  transition: transform 0.2s;
  color: #ffe31a;
  text-transform: capitalize;
  font-size: 2rem;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(16, 179, 190, 0.4);
    border-radius: 10px;
    z-index: -1;
  }
  &:hover {
    transform: scale(1.05);
  }
 `;

const PokemonImage = styled.img`
  width: 150px;
 
`;

const PokemonType = styled.p`
  background-color: rgba(11, 175, 156, 0.3);
  box-shadow: inset 0px -2px 50px 0px rgb(61, 58, 61);
  border-radius: 5px;
  display: inline-block;
  padding: 5px 3px;
  margin: 5px;
  font-size: 1.4rem;
  color: #ffe31a;
  color: ;
`;
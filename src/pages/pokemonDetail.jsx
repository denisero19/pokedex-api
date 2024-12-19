import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ThemeContext } from "../theme-context/theme-context";
import axios from "axios";
import * as Style from "./pokemonDetailStyle";
import { ThemeTogglerButton } from "../components/theme-toggler-button/theme-toggler-button";
import { getPokemonDetails } from "./Api";

function PokemonDetail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
       const fetchPokemonDetails = async () => {
        try {
          const response = await getPokemonDetails(id);
          const abilities = await Promise.all(response.data.abilities.map(async (ability) => {
            const abilityDetails = await axios.get(ability.ability.url);
            return {
              name: ability.ability.name,
              description: abilityDetails.data.effect_entries?.[0]?.effect || "Habilidade",
            };  
          })
        );
          
        setPokemon({
          name: response.data.name,
          types: response.data.types.map((type) => type.type.name),
          moves: response.data.moves.map((move) => move.move.name),
          abilities,
          image: response.data.sprites.other['official-artwork'].front_default,
         });

        } catch (error) {
          console.error("Erro ao buscar detalhes do Pokémon:", error);
        }
       };
       fetchPokemonDetails(); 
    }, [id]);

   if (!pokemon) return <div>Carregando...</div>;
   
return (
  <div style={{
    // color: theme.color, backgroundImage: `url("${theme.bgImage}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
  }}>
    <CardContainer.Styles>
      <PokemonImage.Styles src={pokemon.image} alt={pokemon.name}>
      </PokemonImage.Styles>

      <ThemeTogglerButton /> 

      <DetailesPokemon.Styles>
        <NomePokemon.Styles>{pokemon.name}</NomePokemon.Styles>
          <h3>tipo: {pokemon.types.join(', ')}</h3>
          <h3>Habilidades</h3>
          <AbilityList.Styles>
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>
                <p><strong>{ability.name}:</strong>
                  {ability.description}</p>
              </li>
            ))}
          </AbilityList.Styles>
          <h3>Movimentos</h3>
          <MoveList.Styles>
            {pokemon.moves.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </MoveList.Styles>
        </DetailesPokemon.Styles>

        <Link to="/">
          <Button.Styles>Voltar para lista</Button.Styles>
        </Link>
      </CardContainer.Styles>
  </div>
  );
}

export default PokemonDetail;
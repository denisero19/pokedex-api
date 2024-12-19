import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../theme-context/theme-context";
import axios from "axios";
import PokemonCard from "../components/pokemonCard/pokemonCard";
import SearchBar from "../components/searchPokemon/searchPokemon";
import Logo from "../components/searchPokemon/logo";
import * as Styles from "./HomeStyle";
import { ThemeTogglerButton } from "../components/theme-toggler-button/theme-toggler-button";
import { getPokemons } from "./Api";

function Home() {
    const { theme } = useContext(ThemeContext)
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        loadPokemons();
    }, [offset]);
   
const loadPokemons = async () => {
   try {
    const response = await getPokemons(offset);
      const newPokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: details.data.sprites.front_default,
            id: details.data.id,
            types: details.data.types.map((typeInfo) => typeInfo.type.name)
          };
        })
      );

      const solePokemons = newPokemons.filter(
        (newPokemon) => !pokemonList.some((pokemon) => pokemon.id === newPokemon.id)
      );

      setPokemonList((prevList) => [...prevList, ...solePokemons.filter((newPokemon) => !prevList.some((pokemon) => pokemon.id === newPokemon.id)
      ),
      ]);
        } catch (error) {
        console.error('Erro ao carregar Pokémons:', error);
        }
  };

const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 10)
}

return (
    <div style={{
      backgroundImage: `url("${theme.bgImage}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      width:'100%',
      minHeight: '100vh'
    }}>

      <Styles.PageContainer>
        <Logo />
        <ThemeTogglerButton/>
        <SearchBar />
         <Styles.PokemonGrid>
          {pokemonList.map((pokemons, index) => (
            <PokemonCard key={index} pokemon={pokemons} />
          ))}
         </Styles.PokemonGrid>
        <Styles.LoadMoreButton onClick={handleLoadMore}>Carregar mais</Styles.LoadMoreButton>
      </Styles.PageContainer>
    </div>
 )
};

export default Home;
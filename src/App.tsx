import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonColection from "./components/PokemonColection";
import { Pokemon } from "./interface";
const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=5";
interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemon((p) => [...p, poke.data]);
        console.log(poke)
        setLoading(false);
      });
    };
    getPokemon();
   
  }, []);

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemon) => {
      const pokeData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemon((p) => [...p, pokeData.data]);
      setLoading(false);
    });

  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonColection pokemons={pokemon} />
        <div className="btn">
          <button onClick={nextPage}>
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

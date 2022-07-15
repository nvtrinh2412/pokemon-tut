import React from "react";
import { Detail } from "../App";
import { Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";

interface Props {
  pokemons: PokemonDetail[];
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
  viewDetail: Detail;
}

const PokemonColection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setViewDetail } = props;
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpen) {
      setViewDetail({
        id: id,
        isOpen: true,
      });
      console.log(id);
    }
  };
  return (
    <>
      <section
        className={
          viewDetail.isOpen
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpen ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {pokemons.map((pokemon) => {
          return (
            <div className="" onClick={() => selectPokemon(pokemon.id)}>
              <PokemonList
                viewDetail={viewDetail}
                setViewDetail={setViewDetail}
                key={pokemon.id}
                name={pokemon.name}
                abilities={pokemon.abilities}
                id={pokemon.id}
                image={pokemon.sprites.front_default}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PokemonColection;

import React, { useEffect, useState } from "react";
import { Detail } from "../App";
import { PokemonDetail } from "../interface";
import "./pokemon.css";
interface Props {
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  name: string;
  id: number;
  image: string;
}
const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, viewDetail, setViewDetail } = props;
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(id === viewDetail?.id);
  }, [viewDetail]);
  const closeDetail = () =>{
      setViewDetail({
        id: 0,
        isOpen: false
      });
      setSelected(false)
  }
  return (
    <div>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>
              X
            </p>
          <div className="detail-info">
            <img src={image} alt="pokemon" className="detail-img" />
            <p className="detail-name">{name}</p>
          </div>
          <div className="detail-skill">
            <p className="detail-ability">Abilies: </p>
            {abilities?.map((ability: any) => {
              console.log(ability);
              return <div>{ability.ability.name}</div>;
            })}
          </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;

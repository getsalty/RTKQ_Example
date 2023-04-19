import { useState } from "react";
import "./styles.css";
import {
  useGetAllPokemonNamesQuery,
  useGetPokemonByNameQuery,
} from "./services/pokemonController";

type PokemonProps = {
  name: string;
};

function Pokemon(props: PokemonProps) {
  const { name } = props;
  const { data, isError, isLoading } = useGetPokemonByNameQuery(name);

  return (
    <div>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
}

export default function App() {
  const [pokemonName, setPokemonName] = useState<string | null>(null);
  const [showPokemon, setShowPokemon] = useState(false);

  const { data, isError, isLoading } = useGetAllPokemonNamesQuery();

  return (
    <div className="App">
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <select onChange={evt => setPokemonName(evt.currentTarget.value)}>
          {data.map(pkmn => (
            <option key={pkmn} value={pkmn}>
              {pkmn}
            </option>
          ))}
        </select>
      ) : null}

      <button onClick={_ => setShowPokemon(!showPokemon)}>
        Toggle {pokemonName}
      </button>

      {showPokemon && pokemonName && <Pokemon name={pokemonName} />}
    </div>
  );
}

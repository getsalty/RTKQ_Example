import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pokemon, PokemonPageResult } from "./types";

export const pokemonController = createApi({
  reducerPath: "pokemonController",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/pokemon/" }),
  endpoints: build => ({
    getAllPokemonNames: build.query<string[], void>({
      query: _ => "",
      transformResponse: (response: PokemonPageResult) =>
        response.results.map(pkmn => pkmn.name),
    }),
    getPokemonByName: build.query<Pokemon, string>({
      query: name => `${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetAllPokemonNamesQuery } =
  pokemonController;

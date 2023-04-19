import { configureStore } from "@reduxjs/toolkit";
import { pokemonController } from "./services/pokemonController";

export const store = configureStore({
  reducer: {
    [pokemonController.reducerPath]: pokemonController.reducer,
  },
  middleware: gDM => gDM().concat(pokemonController.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

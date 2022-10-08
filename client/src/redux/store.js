import { configureStore } from '@reduxjs/toolkit';      // alternative of createStore
import { shazamCoreApi } from "./services/shazamCore"

import playerReducer from './features/playerSlice';

export const store = configureStore({                   // extra-line-1
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleare: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware)   // applying middleware - like thunk in redux
});




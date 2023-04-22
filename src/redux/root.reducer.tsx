import { combineReducers } from "redux";
import searchReducer from "./search/search.reducer";
import setRestaurant from "./restaurant/restaurant.reducer";

export const rootReducer = combineReducers({
  address: searchReducer,
  restaurant: setRestaurant,
});

export type RootState = ReturnType<typeof rootReducer>;

import { Restaurant } from "../../interfaces/interfaces";
import { RestaurantTypes } from "./restaurant.types";

const INITIAL_STATE = {
  restaurant: [],
};

type RestaurantAction = { type: "ADD"; payload: Restaurant[] };

const setRestaurant = (state = INITIAL_STATE, action: RestaurantAction) => {
  switch (action.type) {
    case RestaurantTypes.ADD_RESTAURANT:
      return {
        ...state,
        restaurant: action.payload,
      };
    default:
      return state;
  }
};

export default setRestaurant;

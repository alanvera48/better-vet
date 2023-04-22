import { RestaurantTypes } from "./restaurant.types";


interface Restaurant {
  id: string;
  name: string;
  address?: string;
  rating?: number;
}

export const addRestaurant = (item: Restaurant[]) => {
  return {
    type: RestaurantTypes.ADD_RESTAURANT,
    payload: item,
  };
};

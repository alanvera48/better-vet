import { Address } from "../../interfaces/interfaces";
import SearchTypes from "./search.types";

export const updateAddress = (item: Address) => {
  return {
    type: SearchTypes.ADD_ITEM,
    payload: item,
  };
};

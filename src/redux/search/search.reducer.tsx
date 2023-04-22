import { Address } from "../../interfaces/interfaces";
import SearchTypes from "./search.types";

const INITIAL_STATE = {
  address: {
    label: "",
    location: { lat: null, lng: null },
  },
};

type AddressAction = { type: "ADD_ITEM"; payload: Address };

const searchReducer = (state = INITIAL_STATE, action: AddressAction) => {
  switch (action.type) {
    case SearchTypes.ADD_ITEM:
      return {
        address: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;

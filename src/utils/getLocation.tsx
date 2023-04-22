import axios from "axios";
import {
  RestaurantResult,
  GetRestaurantsProps,
} from "../interfaces/interfaces";

//REACT_APP_YELP_API_KEY="E-Pm2UgkiLd3saPf3gp2tAU-jvLD83iF6NCttSyv3hnI5b7D5uw7kMhxwsr7GYpk_Hwh_3-B_5o4s6AMP3nuxBHX_EkeyhbwDfSn3EOHhN-ptpo45Ow7ny2AlQM-ZHYx"
//REACT_APP_GOOGLE_API_KEY=AIzaSyCwU2RuON3VYQdS0FmJNCr2VSZFEjQzOyQ

export const getRestaurants = async (
  position: GetRestaurantsProps
): Promise<RestaurantResult> => {
  //PARA USAR LA API DE YELP, ES NECESARIO VALIDAR EL CORS EN LA URL https://cors-anywhere.herokuapp.com/
  const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
  const yelpApiUrl = `https://api.yelp.com/v3/businesses/search?latitude=${position.lat}&longitude=${position.lng}`;
  const yelpApiRequestUrl = corsAnywhereUrl + yelpApiUrl;
  // const url = `http://localhost:8080/restaurants?latitude=${position.lat}&longitude=${position.lng}`;
  try {
    const { data } = await axios(yelpApiRequestUrl, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
      },
    });
    return data;
  } catch (error) {
    return {
      businesses: [],
      region: {
        center: {
          latitude: 0,
          longitude: 0,
        },
      },
    };
  }
};

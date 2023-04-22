import axios from "axios";
import { ReviewsResult } from "../interfaces/interfaces";

export const getRestaurantReviews = async (id: any): Promise<ReviewsResult> => {
  const { _, queryKey } = id;

  const yelpUrl = `https://api.yelp.com/v3/businesses/${queryKey[1]}/reviews?locale=es_AR`;
  const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
  const yelpApiRequestUrl = corsAnywhereUrl + yelpUrl;
  // const url = `http://localhost:8080/reviews?id=${queryKey[1]}`;
  try {
    const { data } = await axios(yelpApiRequestUrl, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
      },
    });
    const { reviews } = data;
    return reviews;
  } catch (error) {
    return {
      reviews: [],
    };
  }
};

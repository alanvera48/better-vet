export interface Restaurant {
  restaurant: {
    id: string;
    name: string;
    address: string;
    rating: number;
  }[];
}

// export interface Address {
//   lat: number;
//   lng: number;
// }

export interface Address {
  label: string;
  location?: { lat: number | null; lng: number | null };
}

export interface CardProps {
  id: string;
  image_url: string;
  rating: number;
  is_closed: boolean;
  name: string;
  review_count: number;
  display_phone: string;
  location: {
    address2: string;
    address1: string;
    address3: string;
    city: string;
  };
}

export interface RestaurantResult {
  businesses: {
    id: string;
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }[];
  region: {
    center: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface GetRestaurantsProps {
  lat: number;
  lng: number;
}

export interface ReviewsResult {
  reviews: {
    id: string;
    text: string;
    user: {
      image_url: string;
      name: string;
    };
  }[];
}

export interface ReviewsResultItem {
  id: string;
  text: string;
  user: {
    image_url: string;
    name: string;
  };
}

export interface DispatchProps {
  updateAddress: (data: any) => { type: string; payload: any };
  addRestaurant: (data: any) => { type: string; payload: any };
}

export interface MyComponentProps {
  updateAddress: (data: any) => { type: string; payload: any };
  addRestaurant: (data: any) => { type: string; payload: any };
  setErrorMessage: (value: any) => any;
}

export interface DispatchNoOptionValueProps {
  updateAddress: (data: any) => { type: string; payload: any };
}

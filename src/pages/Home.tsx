import React, { useEffect, useState } from "react";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import styled from "styled-components";
import { selectAddress } from "../redux/search/address.selector";
import { useSelector } from "react-redux";
import { selectRestaurants } from "../redux/restaurant/restaurant.selector";
import Card from "../components/Card/Card";
import { CardProps, Restaurant } from "../interfaces/interfaces";

export default function Home() {
  const [restaurantSelected, setRestaurantSelected] = useState<any>();
  const [errorMessage, setErrorMessage] = useState(false);
  const restaurants: Restaurant[] = useSelector(selectRestaurants);

  useEffect(() => {
    if (restaurants) setRestaurantSelected(restaurants);
  }, [restaurants]);

  useEffect(() => {
    if (errorMessage)
      setTimeout(() => {
        setErrorMessage(false);
      }, 1500);
  }, [errorMessage]);

  return (
    <div style={{ height: "100%" }}>
      <HomeContainer>
        <h2 className="home-title">
          Find your favourite restaurant near to you
        </h2>
        <SearchContainer>
          <SearchComponent setErrorMessage={setErrorMessage} />
        </SearchContainer>
        {errorMessage && (
          <div className="error-message">
            Must enter an address, city to find restaurant near to you.
          </div>
        )}
      </HomeContainer>

      <ContainerCards>
        {restaurantSelected &&
          restaurantSelected.restaurant.length > 0 &&
          restaurantSelected.restaurant.map(
            ({
              name,
              id,
              image_url,
              rating,
              is_closed,
              location,
              review_count,
              display_phone,
            }: CardProps) => (
              <Card
                name={name}
                id={id}
                image_url={image_url}
                rating={rating}
                is_closed={is_closed}
                location={location}
                review_count={review_count}
                display_phone={display_phone}
              />
            )
          )}
      </ContainerCards>
    </div>
  );
}

const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 20px;
  padding: 50px;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 70vh;
  position: relative;
  background-image: url("/img/main-banner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:after {
    content: "";
    background-color: #343342;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0.6;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: #fff;
  padding: 16px 16px;
  margin: 0 auto;
  border-radius: 4px;
}
`;

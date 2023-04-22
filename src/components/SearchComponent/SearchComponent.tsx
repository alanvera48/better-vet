import React, { useState, Fragment, useEffect } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { useMutation, useQueryClient } from "react-query";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { DispatchProps, MyComponentProps } from "../../interfaces/interfaces";
import { addRestaurant } from "../../redux/restaurant/restaurant.actions";
import { selectAddress } from "../../redux/search/address.selector";
import { updateAddress } from "../../redux/search/search.actions";
import { getRestaurants } from "../../utils/getLocation";
import { Oval } from "react-loader-spinner";
import NoOptionValue from "./NoOptionValue";
import { Address } from "../../interfaces/interfaces";

const SearchComponent = ({
  updateAddress,
  addRestaurant,
  setErrorMessage,
}: MyComponentProps) => {
  const { address } = useSelector(selectAddress);
  const [currentLocation, setCurrentLocation] = useState<any>(address);

  useEffect(() => {
    setCurrentLocation(address);
  }, [address]);

  const useGetRestaurants = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: any) => getRestaurants(data),
      onSuccess: (response) => {
        queryClient.invalidateQueries("restaurants");
        addRestaurant(response.businesses);
      },
    });
  };

  const { mutate: mutateRestaurants, isLoading: isLoadingRequest } =
    useGetRestaurants();

  const handleChange = async (inputValue: any) => {
    const { label } = inputValue;
    const result = await geocodeByPlaceId(inputValue.value.place_id);
    const { geometry } = result[0];
    const lat = geometry.location.lat();
    const lng = geometry.location.lng();
    updateAddress({ label: label, location: { lat, lng } });
  };

  const handleOnClick = () => {
    const addressGet: Address = address;
    const { location } = addressGet;
    if (location && location.lat == null) setErrorMessage(true);
    mutateRestaurants(location);
  };

  return (
    <Fragment>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridGap: "0px",
        }}
      >
        <GooglePlacesAutocomplete
          // value={defaultLocation}
          apiOptions={{ language: "es", region: "fr" }}
          autocompletionRequest={{
            types: ["geocode"],
            componentRestrictions: {
              country: ["ar"],
            },
          }}
          minLengthAutocomplete={4}
          selectProps={{
            value: currentLocation
              ? currentLocation.label
                ? currentLocation
                : null
              : null,
            onChange: handleChange,
            placeholder: "Search by closest address..",
            noOptionsMessage: () => {
              return <NoOptionValue />;
            },
            styles: {
              container: (base) => ({
                ...base,
                marginTop: "10px",
                position: "initial",
                width: "500px",
                zIndex: 2,
              }),
              control: (base, state) => ({
                ...base,
                backgroundColor: "none",
                border: "none",
                borderRadius: "none",
                padding: 0,
                boxShadow: "none",
              }),
              input: (base) => ({
                ...base,
              }),
              placeholder: (base) => ({
                ...base,
                marginLeft: 0,
              }),
              valueContainer: (base) => ({
                ...base,
                padding: 0,
              }),
              indicatorsContainer: (base) => ({
                display: "none",
              }),
              menu: (base) => ({
                ...base,
                padding: "16px",
                top: "80px",
                width: "100%",
                left: "0px",
              }),
              menuList: (base) => ({
                ...base,
              }),
            },
          }}
        />
        <SearchButton onClick={() => handleOnClick()}>
          {isLoadingRequest && (
            <Oval visible={true} height="30" width="30" color="#fff" />
          )}
          {!isLoadingRequest && "Search"}
        </SearchButton>
      </div>
    </Fragment>
  );
};

const SearchButton = styled.button`
  background: #343342;
  color: #fff;
  border: 1px solid #343342;
  width: auto;
  margin-left: 16px;
  height: 48px;
  border-radius: 4px;
  padding: 0 20px;
  border: 0;
  font-size: 16px;
  outline: 0;
  cursor: pointer;
  font-family: Source Sans Pro, sans-serif;
  font-weight: 600;
  border-radius: 4px;
  height: 46px;
  white-space: normal;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateAddress: (data: any) => dispatch(updateAddress(data)),
  addRestaurant: (data: any) => dispatch(addRestaurant(data)),
});

export default connect(null, mapDispatchToProps)(SearchComponent);

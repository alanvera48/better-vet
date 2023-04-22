import React, { useEffect, useState } from "react";
import { TbLocation } from "react-icons/tb";
import { connect, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { DispatchNoOptionValueProps } from "../../../interfaces/interfaces";
import { selectAddress } from "../../../redux/search/address.selector";
import { updateAddress } from "../../../redux/search/search.actions";

export interface MyComponentProps {
  updateAddress: (data: any) => { type: string; payload: any };
}

const NoOptionValue = ({ updateAddress }: MyComponentProps) => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  const { address } = useSelector(selectAddress);

  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const { results } = await response.json();
      const currentLocation = {
        label: `${results[0].address_components[1].short_name}, ${results[0].address_components[2].short_name}, ${results[0].address_components[3].short_name}`,
        location: { lat: latitude, lng: longitude },
      };

      updateAddress(currentLocation);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: "pointer",
      }}
      onClick={getUserLocation}
    >
      <TbLocation size={22} style={{ stroke: "#21a4d4" }} />
      <span className="current-location-button">Current Location</span>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch
): DispatchNoOptionValueProps => ({
  updateAddress: (data: any) => dispatch(updateAddress(data)),
});

export default connect(null, mapDispatchToProps)(NoOptionValue);

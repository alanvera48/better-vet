import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { AiOutlineCloseCircle, AiFillPhone } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { RatingStars } from "../../utils/ratingStars";
import { Divider, Row } from "../../commons/CardComponents";
import { useQuery } from "react-query";
import { getRestaurantReviews } from "../../utils/getReviews";
import ReviewCard from "./ReviewCard/ReviewCard";
import { ReviewsResultItem } from "../../interfaces/interfaces";
import { Oval } from "react-loader-spinner";

Modal.setAppElement("#root");

export default function ModalCard({
  id,
  show,
  onClose,
  name,
  image_url,
  rating,
  location,
  review_count,
  display_phone,
}: any) {
  const [reviews, setReviews] = useState<any>();

  const { isLoading } = useQuery(["reviews", id], getRestaurantReviews, {
    onSuccess: (data) => {
      setReviews(data);
    },
  });

  return (
    <ModalContainer
      isOpen={show}
      onRequestClose={onClose}
      overlayClassName="overlay"
    >
      <ContainerImageCard
        style={{
          backgroundImage: `url(${
            image_url ? image_url : "/img/no-image.png"
          })`,
        }}
      >
        <span>
          <AiOutlineCloseCircle onClick={onClose} color="#fff" size={25} />
        </span>
      </ContainerImageCard>
      <div className="restaurant-container-info">
        <div>
          <h1 style={{ color: "#202124" }}>{name}</h1>
          <Row>
            <RatingStars rating={rating} />
            <span>({review_count})</span>
          </Row>
        </div>
        <Divider />
        <div>
          <Row>
            <MdLocationOn size={25} color={"#1b71e2"} />
            <span>
              {location?.address1}
              {location.address2 && `${location.address2},`}
              {location.address3 && `${location.address3},`} ,{location.city}
            </span>
          </Row>
          {display_phone && (
            <Row>
              <AiFillPhone size={24} color={"#1b71e2"} />
              <span>{display_phone}</span>
            </Row>
          )}
        </div>
        <Divider />
        <div>
          <h3 style={{ color: "#202124" }}>Reviews</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoading && (
              <Oval visible={true} height="30" width="30" color="#fff" />
            )}
          </div>
          {!isLoading && reviews?.length > 0 ? (
            reviews.map(({ id, text, user }: ReviewsResultItem) => (
              <ReviewCard id={id} text={text} user={user} />
            ))
          ) : (
            <span>No reviews found.</span>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}

export const ModalContainer = styled(Modal)`
  background-color: #f4f5f7;
  width: 400px;
  border-radius: 16px;
  margin: 48px 0 80px;
  min-height: 450px;
  outline: none;
  overflow: hidden;
`;

const ContainerImageCard = styled.div`
  height: 250px;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
  cursor: pointer;
`;

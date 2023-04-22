import React from "react";
import styled from "styled-components";
import { ReviewsResultItem } from "../../../interfaces/interfaces";

export default function ReviewCard({ id, user, text }: ReviewsResultItem) {
  return (
    <ReviewItemContainer>
      <RowUser>
        <img
          src={user.image_url}
          alt={user.name}
          style={{ width: "32px", height: "32px", borderRadius: "50%" }}
        />
        <span
          style={{
            marginLeft: "20px",
            fontSize: "15px",
            color: "#202124",
            fontWeight: "bold",
          }}
        >
          {user.name}
        </span>
      </RowUser>
      <TextReview>{text}</TextReview>
    </ReviewItemContainer>
  );
}

const RowUser = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewItemContainer = styled.div`
  margin: 10px 0;
  padding: 0 10px;
`;

const TextReview = styled.p`
  color: #3c4043;
  font-family: Roboto, Arial, sans-serif;
  font-size: 0.875rem;
`;

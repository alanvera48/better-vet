import { Fragment, useState } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import ModalCard from "../ModalCard/ModalCard";
import { RatingStars } from "../../utils/ratingStars";
import { Row } from "../../commons/CardComponents";
import { CardProps } from "../../interfaces/interfaces";

export default function Card({
  name,
  id,
  image_url,
  rating,
  is_closed,
  location,
  review_count,
  display_phone,
}: CardProps) {
  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  return (
    <Fragment>
      <ContainCard id={id} onClick={onOpen}>
        <div className="contain-info">
          <div className={`chip-status ${is_closed ? "close" : "open"}`}>
            {is_closed ? "Closed" : "Open"}
          </div>
          <span className="card-name">{name}</span>
          <Row>
            <RatingStars rating={rating} />
            <span
              style={{ color: "#70757a", fontSize: "12px" }}
              className="reviews"
            >{`(${review_count})`}</span>
          </Row>
          <span style={{ color: "#70757a", fontSize: "12px" }}>
            {location?.address1}{" "}
            {location?.address2 && `, ${location.address2}`}
          </span>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <img
            src={image_url ? image_url : "/img/no-image.png"}
            alt={name}
            style={{
              width: "84px",
              height: "84px",
              marginLeft: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
      </ContainCard>
      {show && (
        <ModalCard
          id={id}
          onClose={onClose}
          show={show}
          name={name}
          image_url={image_url}
          rating={rating}
          is_closed={is_closed}
          location={location}
          review_count={review_count}
          display_phone={display_phone}
        />
      )}
    </Fragment>
  );
}

const ContainCard = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 12px;
  box-shadow: rgba(181, 129, 108, 0.8) 0px 8px 34px -25px;
  border-radius: 6px;
  background: rgb(255, 255, 255);
  cursor: pointer;
`;

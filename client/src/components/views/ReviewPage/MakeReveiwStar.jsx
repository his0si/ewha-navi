import React, { useState, useEffect } from "react";
import BigEmptyStarIcon from "../../utils/icons/BigEmptyStarIcon.svg";
import BigFullStarIcon from "../../utils/icons/BigFullStarIcon.svg";
import styled from "styled-components";

const MakeReviewStar = ({ onChangeReviewNum, resetTrigger }) => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];

  // resetTrigger가 변경될 때마다 별점을 초기화
  useEffect(() => {
    setClicked([false, false, false, false, false]);
  }, [resetTrigger]);

  const starScore = (index) => {
    let star = [...clicked];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index ? true : false;
    }
    setClicked(star);
  };

  let clickedStarNum = clicked.filter((element) => element === true).length;

  useEffect(() => {
    onChangeReviewNum(clickedStarNum);
  }, [clickedStarNum, onChangeReviewNum]);

  return (
    <RatingSelectBox>
      {array.map((index) => (
        <StarImg
          key={index}
          onClick={() => starScore(index)}
          src={clicked[index] ? BigFullStarIcon : BigEmptyStarIcon}
        />
      ))}
    </RatingSelectBox>
  );
};

const RatingSelectBox = styled.div`
  margin-top: 15px;
`;

const StarImg = styled.img`
  cursor: pointer;
`;

export default MakeReviewStar;
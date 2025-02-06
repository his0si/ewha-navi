import styled from "styled-components";
import React, { useState } from "react";
import BigEmptyStarIcon from "../../utils/icons/BigEmptyStarIcon.svg";
import BigFullStarIcon from "../../utils/icons/BigFullStarIcon.svg";

const ReviewDataBox = ({ratingData, textData})=>{
    const fullStars = Array.from(
        {length : ratingData}, (_, index) =>{
            return <img alt = "fullstar" src = {BigFullStarIcon} key={`full-${index}`}/>
        }
    );
    const emptyStars = Array.from(
        {length : 5 - ratingData}, (_, index)=>{
            return <img alt = "emptystar" src = {BigEmptyStarIcon} key = {`empty-${index}`}/>
        }
    );

    return <>
    <div>
        <RatingBox>{fullStars}{emptyStars}</RatingBox>
        <TextBox>{textData}</TextBox>
    </div>
    </>
};

const RatingBox = styled.div`
    margin-top : 10px;
    margin-bottom : 10px;
`;

const TextBox = styled.div`
    padding: 10px;
    width: 327px;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
`;

export default ReviewDataBox;
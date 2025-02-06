// 뒤로 이동하는 버튼이 있는 header
import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import GoBackIcon from "../icons/GoBackIcon.svg";


const ReviewWritingHeader = ({title})=>{
    const navigate = useNavigate();

    const goBack = ()=>{
        navigate(-1);
    };

    return <>
    <HeaderBar>
    <GoBackBtn onClick={goBack}><img src={GoBackIcon} alt="gobackicon"></img></GoBackBtn>
    <ReviewBarName>{title}</ReviewBarName>
    <EmptyBox></EmptyBox>
    </HeaderBar>
    </>
}
const HeaderBar = styled.div`
position: sticky;
    bottom: 0;
    top: 0;
    right: 0;
    height: 7vh;
    background-color: #FFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px 20px;

    max-width: 390px;
    margin-left: auto;
    margin-right: auto;
    z-index : 100;
`;
const GoBackBtn = styled.div`
    width: 8px;
    padding: 0;
    margin: 0;
    cursor: pointer;
`; 
const EmptyBox = styled.div`
    width: 8px;
    padding: 0;
    margin: 0;
`;
const ReviewBarName = styled.div`
    font-size: 15px;
    color: #0F3D2B;
    font-family: "Pretendard-Bold";
    font-weight: 700;
    font-style: normal;
    font-size: 19px;
    line-height: 23px;
`;
export default ReviewWritingHeader;
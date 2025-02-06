import React from "react";
import styled from "styled-components";
import SmallStarIcon from "../../utils/icons/SmallStarIcon.svg";
import mainGate from "../../images/shortcuts/mainGate.png";
import backGate from "../../images/shortcuts/backGate.png";
import poscoAsan from "../../images/shortcuts/poscoAsan.png";
import business from "../../images/shortcuts/business.png";
import asan from "../../images/shortcuts/asan.png";
import asanBusiness from "../../images/shortcuts/asanBusiness.png";
import podo from "../../images/shortcuts/podo.png";
import hakEcc from "../../images/shortcuts/hakEcc.png";
import ecc from "../../images/shortcuts/ecc.png";
import posco from "../../images/shortcuts/posco.png";
import jingong from "../../images/shortcuts/jingong.png";
import libraryecc from "../../images/shortcuts/libraryecc.png";
import dormitorymusic from "../../images/shortcuts/dormitorymusic.png";
import jongScience from "../../images/shortcuts/jongScience.png";
import hakAsan from "../../images/shortcuts/hakAsan.png";
import asanHak from "../../images/shortcuts/asanHak.png";
import gymHak from "../../images/shortcuts/gymHak.png";
import hakGym from "../../images/shortcuts/hakGym.png";

const imageMapping = {
    "정문-기숙사": mainGate,
    "후문-기숙사": backGate,
    "정문-학생문화관":mainGate,
    "포스코관-아산공학관":poscoAsan,
    "신세계관-중앙도서관":business,
    "아산공학관-법학관":asan,
    "아산공학관-신세계관":asanBusiness,
    "포도길":podo,
    "학관-ECC":hakEcc,
    "신세계관-ECC":business,
    "ECC-생활환경관":ecc,
    "신세계관-포스코관":business,
    "포스코관-학관":posco,
    "포스코관-종합과학관":posco,
    "아산공학관-연구협력관":jingong,
    "중앙도서관-ECC":libraryecc,
    "기숙사-음악관":dormitorymusic,
    "종합과학관-음악관":jongScience,
    "신세계관-생활환경관":business,
    "ECC-중앙도서관":ecc,
    "아산공학관-학관":asanHak,
    "학관-아산공학관":hakAsan,

    "체육관-학관":gymHak,
    "학관-체육관":hakGym,


    "포스코관": "POSCO.png",
    "신세계관": "newHall.png",
    "아산 공학관": "AsanEngineering.png",
    "ECC": "ECC.png",
    "종합과학관": "jongScience.png",
    "기숙사": "Dormitory.png",
    "학관": "hakgwan.png",
    "체육관": "gym.png",
    "중앙 도서관": "centralLibrary.png",
  };



const ReviewRoadImageIntro = (props) => {
    return (
        <>
            <GradationBox image={imageMapping[props.roadName] || mainGate}>
                <RoadInfoBox>
                    <RoadTitle>{props.roadName}</RoadTitle>
                    <RoadStartEnd>({props.start}) -  ({props.end})</RoadStartEnd>
                </RoadInfoBox>
                <RatingBox>
                    <div><img src={SmallStarIcon} alt="smallstar" /></div>
                    <RatingNum>{props.rating}</RatingNum>
                </RatingBox>
            </GradationBox>
        </>
    );
}

const FullImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`;

const GradationBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 40vh;
    bottom: 0;
    top: 0;
    right: 0;
    max-width: 390px;
    margin-left: auto;
    margin-right: auto;
    background: ${({ image }) => `url(${image}) no-repeat center center`},
                linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.7) 100%);
    background-size: cover;
    background-blend-mode: overlay;
`;

const RoadInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 40px;
    color: #0F3D2B;
    margin-bottom: 5px;
    align-items: flex-end;
`;

const RatingBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 40px;
    margin-bottom: 20px;
`;

const RoadTitle = styled.div`
    font-family: 'Pretendard-Bold';
    font-size: 20px;
`;


const RoadStartEnd = styled.div`
    font-family: 'Pretendard';
    color: #0F3D2B;
    margin-left: 10px;
    font-size: 14px;
    padding: 0px;
`;

const RatingNum = styled.div`
    margin-left : 5px;
`;



export default ReviewRoadImageIntro;
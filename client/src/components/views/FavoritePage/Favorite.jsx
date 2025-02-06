import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../../utils/Header/Header";
import NextArrow from "../../images/PathListPage/NextArrow.svg";
import FilledStar from "../../images/PathListPage/FilledStar.svg";
import UnfilledStar from "../../images/PathListPage/UnfilledStar.svg";
import WalkingBridge from "../../images/PathListPage/walkingBridge.jpg";
import paths from "../SearchPage/paths.json";
import paths1 from "../SearchPage/paths1.json";
import paths2 from "../SearchPage/paths2.json";
import paths3 from "../SearchPage/paths3.json";


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








// Styled components
const Container = styled.div`
  padding: 16px;
  padding-bottom: 90px;
  background-color: #0f3d2b;
  min-height: 100vh;
`;

const PathListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PathCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  min-height: 120px;
  cursor: pointer;
`;

const ImagePlaceholder = styled.img`
  width: 90px;
  height: 90px;
  background-color: #ddd;
  margin-left: 10px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const PathDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0;
  margin-left: 10px;
  width: 150px;
`;

const PathName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: -10px;
  margin-left: 0;
`;

const PathLocation = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 2px;
  margin-left: 0;
`;

const Rating = styled.div`
  font-size: 12px;
  color: #0f3d2b;
  margin-top: 2px;
  margin-left: 0;
`;

const StarAndReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: auto;
  margin-right: 10px;
`;

const Star = styled.div`
  cursor: pointer;
  align-self: flex-start;
  margin-top: 25px;
  margin-left: 50px;
`;

const ReviewButton = styled.button`
  background-color: #0f3d2b;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 10px;
  white-space: nowrap;
  width: auto;

  &:hover {
    background-color: #45a049;
  }
`;

const ArrowImage = styled.img`
  width: 10%;
  height: 100%;
  margin-left: 7px;
  margin-top: 3px;
`;

const PathMapContainer = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: #0f3d2b;
  font-size: 16px;
`;






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
  "신공학관-연구협력관":jingong,
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









const Favorite = () => {
  const navigate = useNavigate();
  
  const [starredPaths, setStarredPaths] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoritePaths")) || [];
    return storedFavorites;
  });

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [starredPaths]);

  const [averageRatings, setAverageRatings] = useState({});
  const [allPaths, setAllPaths] = useState([
    ...paths.map((path) => ({
      id: path.id,
      name: path.path_name,
      location: `${path.start_building} - ${path.end_building}`,
      start_building: path.start_building,
      end_building: path.end_building,
      rating: 0,
    })),
    ...paths1.map((path) => ({
      id: path.id,
      name: path.path_name,
      location: `${path.start_building} - ${path.end_building}`,
      start_building: path.start_building,
      end_building: path.end_building,
      rating: 0,
    })),
    ...paths2.map((path) => ({
      id: path.id,
      name: path.path_name,
      location: `${path.start_building} - ${path.end_building}`,
      start_building: path.start_building,
      end_building: path.end_building,
      rating: 0,
    })),
    ...paths3.map((path) => ({
      id: path.id,
      name: path.path_name,
      location: `${path.start_building} - ${path.end_building}`,
      start_building: path.start_building,
      end_building: path.end_building,
      rating: 0,
    })),
  ]);

  useEffect(() => {
    const fetchAverageRatings = async () => {
      try {
        const roadNames = allPaths.map((path) => path.name);
        const response = await axios.post(
          "/api/reviews/average-ratings",
          { roadNames }
        );
        setAverageRatings(response.data); 
      } catch (error) {
        console.error("Error fetching average ratings:", error);
      }
    };

    fetchAverageRatings();
  }, [allPaths]);

  const favoritePaths = useMemo(() => {
    return starredPaths.map((index) => allPaths[index]).filter(Boolean);
  }, [starredPaths, allPaths]);

  const handleReviewButtonClick = (e, path) => {
    e.stopPropagation();
    navigate("/review-write", {
      state: {
        roadName: path.name,
        start: path.start_building,
        end: path.end_building,
        rating: averageRatings[path.name] || 0,
      },
    });
  };

  const handleStarClick = (e, index) => {
    e.stopPropagation();
    const updatedFavorites = [...starredPaths];
    if (updatedFavorites.includes(index)) {
      updatedFavorites.splice(updatedFavorites.indexOf(index), 1);
    } else {
      updatedFavorites.push(index);
    }
    setStarredPaths(updatedFavorites);
    localStorage.setItem("favoritePaths", JSON.stringify(updatedFavorites));
  };

  const handlePathClick = (path) => {
    navigate("/search", {
      state: {
        departure: path.start_building,
        arrival: path.end_building,
        showPathDetails: true,
      },
    });
  };

  return (
    <>
      <Header title="즐겨찾기" />
      <Container>
        {favoritePaths.length > 0 ? (
          <PathListContainer>
            {favoritePaths.map((path, index) => (
              <PathCard key={path.id} onClick={() => handlePathClick(path)}>
                <ImagePlaceholder
                  src={imageMapping[path.name] || mainGate} 
                  alt={`${path.name} image`}
                />
                <PathDetails>
                  <PathName>{path.name}</PathName>
                  <PathLocation>{path.location}</PathLocation>
                  <Rating>★ {averageRatings[path.name] || "0"}</Rating>
                </PathDetails>
                <StarAndReviewContainer>
                  <Star onClick={(e) => handleStarClick(e, allPaths.indexOf(path))}>
                    <img
                      src={starredPaths.includes(allPaths.indexOf(path)) ? FilledStar : UnfilledStar}
                      alt="즐겨찾기"
                    />
                  </Star>
                  <ReviewButton onClick={(e) => handleReviewButtonClick(e, path)}>
                    리뷰 보기
                    <ArrowImage src={NextArrow} alt="arrow icon" />
                  </ReviewButton>
                </StarAndReviewContainer>
              </PathCard>
            ))}
          </PathListContainer>
        ) : (
          <PathMapContainer>
            <h5>즐겨찾기된 지름길이 없습니다.</h5>
          </PathMapContainer>
        )}
      </Container>
    </>
  );
};

export default Favorite;
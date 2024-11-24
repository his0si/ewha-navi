import React, { useState, useEffect } from "react";
import styled from "styled-components";
import 화살표 from "../../images/Search/화살표.svg";
import 즐겨찾기 from "../../images/Search/즐겨찾기.svg";
import 즐겨찾기채워짐 from "../../images/Search/즐겨찾기채워짐.svg"; // 채워진 별 이미지 추가
import paths from "./paths.json"; // 통합된 JSON 파일
import Path from "./path.jsx";
import paths1 from "./paths1.json";
import paths2 from "./paths2.json";
import paths3 from "./paths3.json";
import BuildName from "./BuildName";
import { useLocation } from "react-router-dom";

const allPaths = [...paths, ...paths1, ...paths2, ...paths3];

const Search = () => {
  const [selectedMode, setSelectedMode] = useState("도보");
  const [totalTime, setTotalTime] = useState(0);
  const [routeData, setRouteData] = useState(null);
  const [isStarred, setIsStarred] = useState(false);
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [popupImage, setPopupImage] = useState(null); // 팝업 이미지 상태
  const location = useLocation();

  const locations = [
    "ECC",
    "정문",
    "후문",
    "기숙사",
    "아산공학관",
    "이화 신세계관",
    "이화 포스코관",
    "종합과학관",
    "중앙도서관",
    "체육관",
    "학관"
  ];

  // 출발지와 도착지에 따른 소요 시간
  const travelTimes = {
    "정문-기숙사": 16,
    "후문-기숙사": 15,
    "정문-학생문화관": 8,
    "이화 포스코관-아산공학관": 5,
    "이화 신세계관-중앙도서관": 12,
    "아산공학관-법학관": 12,
    "아산공학관-이화 신세계관": 9,
    "이화 포스코관-중앙도서관": 3,
    "학관-ECC": 6,
    "이화 신세계관-ECC": 5,
    "이화 신세계관-이화 포스코관": 6,
    "ECC-생활환경관": 6,
    "이화 포스코관-학관": 2,
    "이화 포스코관-종합과학관": 4,
    "아산공학관-연구협력관": 4,
    "종합과학관-음악관": 12,
    "기숙사-음악관": 8,
    "이화 신세계관-생활환경관": 5,
    "학관-아산공학관":8,
    "아산공학관-학관":7,
    "체육관-학관": 4,
    "학관-체육관": 4, 
    "ECC-중앙도서관": 4,
    "중앙도서관-ECC": 3, 
  };

  const getArrivalOptions = (departure) => {
    switch (departure) {
      case "정문":
        return ["기숙사", "학생문화관"];
      case "후문":
        return ["기숙사"];
      case "이화 포스코관":
        return ["아산공학관", "종합과학관", "중앙도서관", "학관"];
      case "아산공학관":
        return ["법학관", "연구협력관", "이화 신세계관", "학관"];
      case "중앙도서관":
        return ["ECC"];
      case "이화 신세계관":
        return ["ECC", "생활환경관", "이화 포스코관", "중앙도서관"];
      case "학관":
        return ["ECC", "아산공학관", "체육관"];
      case "ECC":
        return ["생활환경관", "중앙도서관"];
      case "종합과학관":
        return ["음악관"];
      case "체육관":
        return ["학관"];
      case "기숙사":
        return ["음악관"];
      default:
        return [];
    }
  };

  const arrivalOptions = getArrivalOptions(departureLocation);

  const calculateTotalTime = (departure, arrival) => {
    const key = `${departure}-${arrival}`;
    return travelTimes[key] || 0;
  };

  useEffect(() => {
    if (departureLocation && arrivalLocation) {
      const time = calculateTotalTime(departureLocation, arrivalLocation);
      setTotalTime(time);
      setRouteData({ departure: departureLocation, arrival: arrivalLocation });
    } else {
      setTotalTime(0);
      setRouteData(null);
    }
  }, [departureLocation, arrivalLocation]);

  useEffect(() => {
    if (location.state?.departure && location.state?.arrival) {
      setDepartureLocation(location.state.departure);
      setArrivalLocation(location.state.arrival);
      
      // 경로가 선택되었을 때 바로 경로 정보를 표시
      if (location.state.showPathDetails) {
        const matchingPath = allPaths.find(
          (path) =>
            path.start_building === location.state.departure &&
            path.end_building === location.state.arrival
        );
        if (matchingPath) {
          setRouteData({
            departure: location.state.departure,
            arrival: location.state.arrival
          });
          setTotalTime(calculateTotalTime(location.state.departure, location.state.arrival));
        }
      }
    }
  }, [location.state]);

  const toggleStar = () => {
    setIsStarred((prev) => !prev);
  };

  const swapLocations = () => {
    const temp = departureLocation;
    setDepartureLocation(arrivalLocation);
    setArrivalLocation(temp);
  };

  const getPathImage = () => {
    const matchingPath = allPaths.find(
      (path) =>
        path.start_building === departureLocation &&
        path.end_building === arrivalLocation
    );
    return matchingPath?.path_image || null;
  };

  return (
    <MainWrapper>
      <SearchContainer>
        <img src={화살표} alt="화살표" onClick={swapLocations} />
        <div>
          <SelectLocation
            value={departureLocation}
            onChange={(e) => {
              setDepartureLocation(e.target.value);
              setArrivalLocation("");
            }}
          >
            <option value="" disabled>
              출발지 선택
            </option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </SelectLocation>
          <SelectArrival
            value={arrivalLocation}
            onChange={(e) => setArrivalLocation(e.target.value)}
            disabled={!departureLocation}
          >
            <option value="" disabled>
              도착지 선택
            </option>
            {arrivalOptions.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </SelectArrival>
        </div>
      </SearchContainer>

      <Select>
        <div
          className={`도보 ${selectedMode === "도보" ? "selected" : ""}`}
          onClick={() => setSelectedMode("도보")}
        >
          도보
        </div>
        <div
          className={`셔틀 ${selectedMode === "셔틀" ? "selected" : ""}`}
          onClick={() => setSelectedMode("셔틀")}
        >
          셔틀
        </div>
      </Select>

      <Wrapper>
        {selectedMode === "도보" ? (
          routeData ? (
            // JSON 데이터를 기반으로 동적 렌더링
            <SearchedInfo>
              <Searched>
                <div className="time">총 소요시간: {totalTime} 분</div>
                <Star onClick={toggleStar}>
                  <img
                    src={isStarred ? 즐겨찾기채워짐 : 즐겨찾기}
                    alt="즐겨찾기"
                  />
                </Star>
              </Searched>
              <PathImage>
                {getPathImage() ? (
                  <img
                    src={require(`../../images/PathImages/${getPathImage()}`)}
                    alt="경로 이미지"
                    style={{ width: "100%", height: "auto", cursor: "pointer" }}
                    onClick={() => setPopupImage(getPathImage())} // 팝업 이미지 설정
                  />
                ) : (
                  <div
                    style={{
                      color: "white",
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    이미지 없음
                  </div>
                )}
              </PathImage>

              <Divider></Divider>
              <Map>
                {allPaths
                  .filter(
                    (path) =>
                      path.start_building === departureLocation &&
                      path.end_building === arrivalLocation
                  )
                  .map((path, index) => (
                    <Path key={index} path={path} />
                  ))}
              </Map>
            </SearchedInfo>
          ) : (
            <BuildName />
          )
        ) : (
          <div />
        )}
        {popupImage && (
          <Popup>
            <Overlay onClick={() => setPopupImage(null)} />
            <PopupContent>
              {popupImage ? (
                <img
                  src={require(`../../images/PathImages/${popupImage}`)}
                  alt="확대 이미지"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <div style={{ textAlign: "center", color: "black" }}>
                  이미지를 불러올 수 없습니다.
                </div>
              )}
              <CloseButton onClick={() => setPopupImage(null)}>
                닫기
              </CloseButton>
            </PopupContent>
          </Popup>
        )}
      </Wrapper>

      <Footer></Footer>
    </MainWrapper>
  );
};

export default Search;

// Styled-components 유지
const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  img {
    margin-right: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
`;

const SelectLocation = styled.select`
  width: 285px;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #ededed;
  color: #b5b5b5;
  font-size: 16px;
  margin-bottom: 7px;
`;

const SelectArrival = styled.select`
  width: 285px;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #ededed;
  color: #b5b5b5;
  font-size: 16px;
  margin-bottom: 7px;
`;

const Select = styled.div`
  width: 100%;
  height: 38px;
  display: flex;

  .selected {
    font-weight: bold;
    color: #0f3d2b;
    border-bottom: solid #0f3d2b;
  }

  div {
    cursor: pointer;
    width: 50%;
    text-align: center;
    color: #8e8e8e;
    border-bottom: solid #e4e4e4;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 812px;
  background-color: #0f3d2b;
`;

const SearchedInfo = styled.div`
  width: 90%;
  .time {
    margin-left: 30px;
    margin-top: 30px;
    align-self: flex-start;
    font-size: 15px;
    color: white;
  }
`;

const Star = styled.div`
  margin-right: 40px;
  transform: translateY(-10px);
  align-self: flex-end;
  cursor: pointer;
`;

const Map = styled.div`
  width: 80%;
  border-left: 1px solid white;
`;

const Searched = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PathImage = styled.div``;
const Divider = styled.div`
  border-top: 1px solid white;
`;

const Footer = styled.div`
  background-color: #0f3d2b;
  width: 100%;
  height: 100px;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`;

const PopupContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1001;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #0f3d2b;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
`;

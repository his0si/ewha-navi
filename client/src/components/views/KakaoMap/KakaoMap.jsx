import React, { useEffect } from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: 500px; 
  border-radius: 8px;
  display: block; 
`;

const KakaoMap = () => {
  
  useEffect(() => {
    // 카카오맵 API가 로드되었는지 확인
    if (!window.kakao) {
      console.error("카카오맵 API를 로드할 수 없습니다.");
      return;
    }

    console.log("카카오맵 API가 성공적으로 로드되었습니다.");

    const { kakao } = window;

    // 지도의 중심 좌표 설정 (이화여대 정문)
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.560426257577554, 126.94718979892164), // 이화여대 좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 클린업 함수 (컴포넌트 언마운트 시 맵 제거)
    return () => {
      mapContainer.innerHTML = "";
    };
  }, []);

  return <MapContainer id="map"></MapContainer>;
};

export default KakaoMap;

import React, { useEffect, useState } from "react";
import Header from "../../utils/Header/Header";
import styled from 'styled-components';
import ToggleIcon from "../../images/ShuttlePage/Toggle.svg"; 
// styled-components 정의
const ShuttleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0f3d2b;
  width: 100vw; /* 전체 화면 너비로 확장 */
  max-width: 100%; /* 최대 너비 제한 해제 */
  margin: 0;
  padding: 0;
  height: 100vh;
`;

const DropdownContainer = styled.div`
  width: 90%;
  margin: 20px 0 15px; /* 고정된 헤더를 피하기 위한 여백 */
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0;
  position: relative;
`;
const IconImage = styled.img`
  width: 16px; /* Adjust size as needed */
  height: 16px;
  margin-right:0px;
`;
const DepartureButton = styled.button`
  background-color: #ffffff;
  color: #2b3d33;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  width: 100%;
  text-align: left;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between text and icon */
  cursor: pointer;
`;
const DepartureDropdown = styled.div`
  background-color: #ffffff;
  position: absolute;
  width: 100%;
  border-radius: 10px;
  top: 45px;
  left: 0;
  z-index: 10;
  display: ${(props) => (props.open ? 'block' : 'none')};
`;
const DepartureItem = styled.div`
  padding: 10px 20px;
  color: #358868;
  cursor: pointer;
  &:hover {
    background-color: #d0e8dc;
  }
`;
const DirectionToggle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-left: 20px;
  margin-bottom:15px;
  
`;
const UpwardButton = styled.button`
  background: ${({ isClicked }) =>
    isClicked
      ? "linear-gradient(to bottom, #358868 0%, #116846 100%)"
      : "white"};
  color: ${({ isClicked }) => (isClicked ? "white" : "#0F3D2B")};
  border: ${({ isClicked }) => (isClicked ? "none" : "none")};
  padding: 5px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  width: 100px;
  height: 30px;
  font-weight: 100;
  margin:0;
  margin-right: 20px;
`;

const DownwardButton = styled.button`
  background: ${({ isClicked }) =>
    isClicked
      ? "linear-gradient(to bottom, #116846 0%, #358868 100%)"
      : "white"};
  color: ${({ isClicked }) => (isClicked ? "white" : "#0F3D2B")};
  border: ${({ isClicked }) => (isClicked ? "none" : "none")};
  padding: 5px 15px;
  width : 100px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 100;
  margin:0;
`;


const RouteInfo = styled.div` //노선 정보
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 90%;
  height: 16%;
  border-radius: 7px;
  margin-bottom: 15px;
`;
const DepartureLocation = styled.div` //정문
  width: 30%;
  height: 100%;
  padding: 15px 5px;
  background-color: #358868;
  color: white;
  border-radius: 4px;
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center; 
`;
const Routes = styled.div`
  width: 80%;
  padding: 0 15px;
  color: #0F3D2B;
`;
const RouteDescription = styled.div`
  border-radius: 7px;
  margin-bottom: 15px;
  font-size: 15px;
  margin-top:10px;

  p{
  font-size: 10px;
  }
`;
const BusTimetableContainer = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between tables */
`;

const RouteTable = styled.div`
  
  display: flex; /* Flexbox 설정 */
  flex-direction: column; /* 세로 정렬 */
  width: 100%; /* 부모의 전체 너비를 채움 */
  padding: 5px 0;
  border-radius: 4px;
  margin-bottom: 15px;

  p {
    font-size: 15px;
    color: #000000;
    margin: 10px 0 10px 0; 
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  th, td {
    font-size: 14px;
    padding: 5px;
    text-align: center;
    border: 2px solid #358868;
    border-radius: 4px;
  }
`;

// 실시간 위치보기 버튼 스타일
const RealTimeButton = styled.a`

  position: absolute; 
  right: 10px; 
  top: 50%; 
  transform: translateY(-50%); 

  background-color: #e6f4ea;
  color: #0f3d2b;
  border: 1px solid #358868;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-left: auto; 


  &:hover {
    background-color: #358868;
    color: white;
  }
`;

const RouteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; 
  text-align:right;
  padding: 0 10px; 
  box-sizing: border-box; 
  flex-shrink: 0; 
  position:relative;
`;


//styled component코드 


const Shuttle = () => {
  const [isUpward, setIsUpward] = useState(true); // 상행/하행 토글 상태 관리
  const [selectedDeparture, setSelectedDeparture] = useState("정문"); // 출발지 선택 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [isUpward]);

  const handleDepartureClick = (departure) => {
    setSelectedDeparture(departure); // 선택한 출발지 업데이트
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열기/닫기 토글
  };

  const shuttleRoutes = {
    정문: [
      {
        route: "연구협력관 노선",
        time: "07:50-21:00",
        interval: "배차간격: 5-10분",
      },
      {
        route: "한우리집 노선",
        time: "08:25-16:05",
        interval: "배차간격: 20분",
      },
    ],
    포관: [
      {
        route: "연구협력관 노선",
        time: "07:52-19:02",
        interval: "배차간격: 5-10분",
      },
      {
        route: "한우리집 노선",
        time: "08:27-16:07",
        interval: "배차간격: 20분",
      },
    ],
    공대삼거리: [
      {
        route: "연구협력관 노선",
        time: "07:54-19:04",
        interval: "배차간격: 5-10분",
      },
      {
        route: "한우리집 노선",
        time: "08:29-16:09",
        interval: "배차간격: 20분",
      },
    ],
    한우리집: [
      {
        
      },
      {
        
      },
    ],
    기숙사삼거리: [
      {
        
      },
    ],
    연구협력관: [
      {
        
      }
    ]
  };


const shuttleRoutes_down = {
  정문: [
    {
      
    },
    {
      
    },
  ],
 
  포관: [
    {
      route: "연구협력관 노선",
      time: "08:05-19:15",
      interval: "배차간격: 5-10분",
    },
    {
      route: "한우리집 노선",
      time: "08:40-16:20",
      interval: "배차간격: 20분",
    },
  ],
  공대삼거리: [
    {
      route: "연구협력관 노선",
      time: "08:03-19:13",
      interval: "배차간격: 5-10분",
    },
    {
      route: "한우리집 노선",
      time: "08:38-16:18",
      interval: "배차간격: 20분",
    },
  ],
  한우리집: [
    
    {
      route: "한우리집 노선",
      time: "08:35-16:15",
      interval: "배차간격: 20분",
    },
  ],
  기숙사삼거리: [
    {
      route: "연구협력관 노선",
      time: "08:01-19:11",
      interval: "배차간격: 5-10분",
    },
  ],
  연구협력관: [
    {
      route: "연구협력관 노선",
      time: "08:00-21:00",
      interval: "배차간격: 5-10분",
    },
  ],
};

const currentRoutes = isUpward ? shuttleRoutes : shuttleRoutes_down;






  // 각 출발지에 따른 상행/하행 시간표
  const timetableData = {
    정문: {
      upward: [
        {
          route: "연구협력관",
          timeRanges: [
            {
              range: "07:50~11:00",
              times: "00, 10, 15, 20, 30, 35, 40, 50, 55",
            },
            { range: "11:10~11:50", times: "00, 10, 20, 30, 40, 50" },
            { range: "11:51~12:59", times: "점심시간 운휴" },
            { range: "13:00~15:40", times: "00, 10, 20, 30, 40, 50" },
            {
              range: "15:50~21:00",
              times: "00, 10, 15, 20, 30, 35, 40, 50, 55",
            },
          ],
        },
        {
          route: "한우리집",
          timeRanges: [
            { range: "08:25~10:45", times: "05, 25, 45" },
            { range: "11:05~13:20", times: "점심시간 운휴" },
            { range: "13:25~16:05", times: "05, 25, 45" },
          ],
        },
      ],
      downward: [], // 하행은 없는듯
    },
    포관: {
      upward: [
        {
          route: "연구협력관",
          timeRanges: [
            {
              range: "07:52~11:52",
              times: "02, 12, 17, 22, 32, 37, 42, 52, 57",
            },
            { range: "11:12~11:52", times: "02, 12, 22, 32, 42, 52" },
            { range: "11:53~13:01", times: "점심시간 운휴" },
            { range: "13:02~15:42", times: "02, 12, 17, 22, 32, 42, 52" },
            {
              range: "15:52~19:02",
              times: "02, 12, 17, 22, 32, 37, 42, 52, 57",
            },
          ],
        },
        {
          route: "한우리집",
          timeRanges: [
            { range: "08:27~10:47", times: "07, 27, 47" },
            { range: "11:05~13:20", times: "점심시간 운휴" },
            { range: "13:27~16:07", times: "07, 27, 47" },
          ],
        },
      ],
      downward: [
        {
          route: "연구협력관",
          timeRanges: [
            {
              range: "08:05~11:15",
              times: "05, 10, 15, 25, 30, 35, 40, 50, 55",
            },
            { range: "11:16~12:05", times: "05, 15, 25, 35, 45, 55" },
            { range: "12:10~13:10", times: "점심시간 운휴" },
            { range: "13:15~15:55", times: "05, 15, 25, 35, 45, 55" },
            { range: "16:00~19:15", times: "05, 15, 25, 30, 35, 45, 55" },
          ],
        },
        {
          route: "한우리집",
          timeRanges: [
            { range: "08:40~11:00", times: "00, 20, 40" },
            { range: "11:00~13:30", times: "점심시간 운휴" },
            { range: "13:40~16:20", times: "00, 20, 40" },
          ],
        },
      ],
    },
    공대삼거리: {
      upward: [
        {
          route: "연구협력관",
          timeRanges: [
            {
              range: "07:54~11:54",
              times: "04, 14, 19, 24, 34, 39, 44, 54, 59",
            },
            { range: "11:14~11:54", times: "04, 14, 24, 34, 44, 54" },
            { range: "12:00~12:59", times: "점심시간 운휴" },
            { range: "13:04~15:44", times: "04, 14, 24, 34, 44, 54" },
            {
              range: "15:54~19:04",
              times: "04, 14, 19, 24, 34, 39, 44, 54, 59",
            },
          ],
        },
        {
          route: "한우리집",
          timeRanges: [
            { range: "08:29~10:49", times: "09, 29, 49" },
            { range: "11:05~13:20", times: "점심시간 운휴" },
            { range: "13:29~16:09", times: "09, 29, 49" },
          ],
        },
      ],
      downward: [
        {
          route: "연구협력관",
          timeRanges: [
            {
              range: "08:03~11:13",
              times: "03, 08, 13, 23, 28, 33, 43, 48, 53",
            },
            { range: "11:23~12:13", times: "03, 13, 23, 33, 43, 53" },
            { range: "12:14~13:12", times: "점심시간 운휴" },
            { range: "13:13~15:53", times: "03, 13, 23, 33, 43, 53" },
            {
              range: "16:03~19:13",
              times: "03, 08, 13, 23, 28, 33, 43, 48, 53",
            },
          ],
        },
        {
          route: "한우리집",
          timeRanges: [
            { range: "08:38~10:58", times: "18, 38, 58" },
            { range: "11:18~13:37", times: "점심시간 운휴" },
            { range: "13:38~16:18", times: "18, 38, 58" },
          ],
        },
      ],
    },
    기숙사삼거리: {
      upward: [], 
      downward: [
        {
          route: "연구협력관",
          timeRanges: [
            {
              range: "08:01~11:11",
              times: "01, 06, 11, 21, 26, 31, 41, 46, 51",
            },
            { range: "11:21~12:11", times: "01, 11, 21, 31, 41, 51" },
            { range: "12:12~13:10", times: "점심시간 운휴" },
            { range: "13:11~15:51", times: "01, 11, 21, 31, 41, 51" },
            {
              range: "16:01~19:11",
              times: "01, 06, 11, 21, 26, 31, 41, 46, 51",
            },
          ],
        },
      ],
    },
    한우리집: {
      upward: [], 
      downward: [
        {
          route: "한우리집",
          timeRanges: [
            { range: "08:35~10:55", times: "15, 35, 55" },
            { range: "11:05~13:20", times: "점심시간 운휴" },
            { range: "13:35~16:15", times: "15, 35, 55" },
          ],
        },
      ],
    },
    연구협력관: {
      upward: [], //상행 없는듯?
      downward: [
        {
          route: "연구협력관",
          timeRanges: [
            {
              range: "08:01~11:05",
              times: "00, 10, 15, 20, 30, 35, 40, 50, 55",
            },
            { range: "11:10~12:00", times: "00, 10, 15, 20, 30, 40, 50" },
            { range: "12:00~13:00", times: "점심시간 운휴" },
            { range: "13:10~15:50", times: "00, 10, 20, 30, 40, 50" },
            {
              range: "16:00~21:00",
              times: "00, 05, 10, 20, 25, 30, 40, 45, 50, 55",
            },
          ],
        },
      ],
    }
  };

  const busTimetable = timetableData[selectedDeparture]?.[isUpward ? 'upward' : 'downward'] || [];

  return (
  <>
    <Header title="셔틀시간표" />

    <ShuttleContainer>
    {/* 출발지 Dropdown */}
    <DropdownContainer>
  <DepartureButton onClick={toggleDropdown}>
    {selectedDeparture}
    <IconImage src={ToggleIcon} alt="Toggle Icon" />
  </DepartureButton>
  <DepartureDropdown open={isDropdownOpen}>
    {Object.keys(currentRoutes).map((departure) => (
      <DepartureItem key={departure} onClick={() => handleDepartureClick(departure)}>
        {departure}
      </DepartureItem>
    ))}
  </DepartureDropdown>
</DropdownContainer>

    {/* 상행/하행 Toggle */}
    <DirectionToggle>
    <UpwardButton isClicked={isUpward} onClick={() => setIsUpward(true)}>
    상행
  </UpwardButton>
  <DownwardButton isClicked={!isUpward} onClick={() => setIsUpward(false)}>
    하행
  </DownwardButton>
    </DirectionToggle>
    {/* 노선 정보 */}
    <RouteInfo>
      <DepartureLocation>{selectedDeparture}</DepartureLocation>
      <Routes>
        {currentRoutes[selectedDeparture].map((route, index) => (
          <RouteDescription key={index}>
            <strong>{route.route}:</strong> {route.time} <p>{route.interval}</p>
                
          </RouteDescription>
        ))}
      </Routes>
    </RouteInfo>
    {/* 버스 시간표 */}

    
    <BusTimetableContainer>
      {busTimetable.length > 0 ? (
        busTimetable.map((bus, index) => (
        <RouteTable key={index}>
           {/* 버스 노선 이름과 실시간 위치 보기 버튼 */}
           <RouteHeader>
                  <p>{bus.route}</p>
                  <RealTimeButton
                    href="http://route.hellobus.co.kr:8787/pub/routeView/ewha_route_day.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    실시간 위치 보기(주간)
                  </RealTimeButton>
                </RouteHeader>
          


          <Table>
            <tbody>
              {bus.timeRanges.map((range, idx) => (
              <tr key={idx}>
                <td>{range.range}</td>
                <td>{range.times}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </RouteTable>
    ))
  ) : (
    <p>해당 방향에 대한 시간표가 없습니다.</p>
  )}
    </BusTimetableContainer>

  </ShuttleContainer>
  </>
);
};

export default Shuttle;
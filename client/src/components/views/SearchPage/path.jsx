import React from "react";
import styled from "styled-components";
import 출발 from "../../images/Search/출발.svg";
import 도착 from "../../images/Search/도착.svg";

const Path = ({ path }) => {
  return (
    <Wrapper>
      {path.directions.map((text, index) => (
        <Build key={index}>
          {index === 0 ? ( // 첫 번째 요소는 "출발" 이미지를 표시
            <img src={출발} alt="출발" />
          ) : index === path.directions.length - 1 ? ( // 마지막 요소는 "도착" 이미지를 표시
            <img src={도착} alt="도착" />
          ) : (
            <div className="dot"></div> // 중간 요소는 점으로 표시
          )}
          <div className="text">{text}</div>
        </Build>
      ))}
    </Wrapper>
  );
};

export default Path;

// Styled-components
const Wrapper = styled.div`
  color: white;
  position: relative;
  padding: 20px;
  transform: translateX(-14px);

  .text {
    margin-left: 30px;
  }

  .dot {
    background-color: white;
    border-radius: 100%;
    width: 7px;
    height: 7px;
    position: absolute;
    left: -10px;
  }

  img {
    position: absolute;
    left: -15px;
  }
`;

const Build = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  position: relative;
`;

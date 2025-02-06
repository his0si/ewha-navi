import React from "react";
import styled from "styled-components";

const Header = ({ title }) => {

  return (
    <HeaderBar>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  height: 7vh;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 20px;
  max-width: 390px;
  margin-left: auto;
  margin-right: auto;
  z-index: 100;
`;


const HeaderTitle = styled.div`
  font-size: 19px;
  color: #0f3d2b;
  font-family: "Pretendard-Bold";
  font-weight: 700;
  font-style: normal;
  line-height: 23px;
`;

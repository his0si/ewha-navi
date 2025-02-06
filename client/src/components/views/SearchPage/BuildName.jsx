import React, { useState, useEffect } from "react";

import styled from "styled-components";

const BuildName = () => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>약어</th>
            <th>건물 이름</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>경영</td>
            <td>이화 신세계관</td>
          </tr>
          <tr>
            <td>공학A</td>
            <td>아산공학관</td>
          </tr>
          <tr>
            <td>공학B</td>
            <td>신공학관</td>
          </tr>
          <tr>
            <td>공대강당</td>
            <td>아산공학관 지하1층 강당</td>
          </tr>
          <tr>
            <td>교A</td>
            <td>교육관 A동</td>
          </tr>
          <tr>
            <td>교B</td>
            <td>교육관 B동</td>
          </tr>
          <tr>
            <td>교문</td>
            <td>이화 삼성교육문화관</td>
          </tr>
          <tr>
            <td>교회301</td>
            <td>대학교회 3층 예배실</td>
          </tr>
          <tr>
            <td>국</td>
            <td>국제교육관</td>
          </tr>
          <tr>
            <td>법</td>
            <td>법학관</td>
          </tr>
          <tr>
            <td>본</td>
            <td>본관</td>
          </tr>
          <tr>
            <td>생활</td>
            <td>생활환경관</td>
          </tr>
          <tr>
            <td>약A</td>
            <td>약학관 A동</td>
          </tr>
          <tr>
            <td>음</td>
            <td>음악관</td>
          </tr>
          <tr>
            <td>음B119</td>
            <td>음악관 지하 시청각실</td>
          </tr>
          <tr>
            <td>의</td>
            <td>목동 의학연구동</td>
          </tr>
          <tr>
            <td>조형A</td>
            <td>조형예술관 A동</td>
          </tr>
          <tr>
            <td>조형B</td>
            <td>조형예술관 B동</td>
          </tr>
          <tr>
            <td>조형C</td>
            <td>조형예술관 C동</td>
          </tr>
          <tr>
            <td>정보B01</td>
            <td>이화 SK텔레콤관 지하1층</td>
          </tr>
          <tr>
            <td>종A</td>
            <td>종합과학관 A동</td>
          </tr>
          <tr>
            <td>종B</td>
            <td>종합과학관 B동</td>
          </tr>
          <tr>
            <td>체</td>
            <td>체육관 A동</td>
          </tr>
          <tr>
            <td>체</td>
            <td>체육관 B동</td>
          </tr>
          <tr>
            <td>체</td>
            <td>체육관 C동</td>
          </tr>
          <tr>
            <td>캠</td>
            <td>이화캠퍼스복합단지(ECC)</td>
          </tr>
          <tr>
            <td>포</td>
            <td>이화 포스코관</td>
          </tr>
          <tr>
            <td>학</td>
            <td>학관</td>
          </tr>
          <tr>
            <td>헬</td>
            <td>헬렌관</td>
          </tr>
          <tr>
            <td>R.H.</td>
            <td>학관 5층 레크레이션홀</td>
          </tr>
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
export default BuildName;

const TableContainer = styled.div`
  margin-top: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
  }
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  td {
    background-color: #fff;
  }
`;

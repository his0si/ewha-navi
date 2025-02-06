import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReviewWritingHeader from "../../utils/Header/Header2";
import ReviewRoadImgIntro from "./ReviewRoadImgIntro";
import MakeReviewStar from "./MakeReveiwStar";
import ReviewDataBox from "./ReviewDataBox";
import styled from "styled-components";
import mainGate from '../../images/shortcuts/mainGate.png';
import backGate from '../../images/shortcuts/backGate.png';



// import { useNavigate } from "react-router-dom";


const ReviewWriting = () => {
  //const navigate = useNavigate();
  const location = useLocation();
  const { roadName, rating, start, end } = location.state || {};

  const [ratingAverage, setRatingAverage] = useState(rating || 0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingNum, setRatingNum] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [resetStars, setResetStars] = useState(0);

  useEffect(() => {
    if (!roadName) return;

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/review-write/get`, {
          params: { roadName },
        });
    
        if (response.data.length === 0) {
          setReviews([]);
          setRatingAverage(0);
        } else {
          setReviews(response.data);
          const averageRating =
            response.data.reduce((sum, review) => sum + review.rating, 0) /
            response.data.length;
          setRatingAverage(parseFloat(averageRating.toFixed(2))); // 숫자로 변환
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [roadName, updateUI]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!ratingNum || !reviewText) {
      alert("별점과 리뷰 내용을 모두 작성해주세요.");
      return;
    }
  
    try {
      await axios.post(`/api/review-write/save`, {
        roadName,
        rating: ratingNum,
        reviewText,
      });
  
      setReviewText("");
      setRatingNum(0);
      setResetStars((prev) => prev + 1);
      setReviews((prevReviews) => [
        { rating: ratingNum, reviewText, _id: Date.now() },
        ...prevReviews,
      ]);
      setUpdateUI(!updateUI);
  
      // navigate를 통해 업데이트 플래그 전달
      // navigate("/favorite", { state: { updated: true } });
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("리뷰 제출에 실패했습니다.");
    }
  }

  

  const onChangeReviewNum = (value) => setRatingNum(value);

  return (
    <>
      <ReviewWritingHeader title="지름길 리뷰" />
      <ReviewRoadImgIntro roadName={roadName} start={start} end={end} rating={ratingAverage} />
      <ReviewContainer>
        <div className="review-writing-box">
          <MakeReviewStar onChangeReviewNum={onChangeReviewNum} resetTrigger={resetStars} />
          <ReviewWriteBox>
            <ReviewForm onSubmit={handleSubmit}>
              <WriteInputBox
                type="text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="  해당 길에 관해 자유롭게 적어보세요."
              />
              <WriteUploadBtn type="submit">리뷰 등록</WriteUploadBtn>
            </ReviewForm>
          </ReviewWriteBox>
          <ReviewHr />
        </div>
        <div>
          {loading ? (
            <div>로딩 중...</div>
          ) : (
            reviews.map((review) => (
              <ReviewDataBox
                key={review._id}
                id={review._id}
                ratingData={review.rating}
                textData={review.reviewText}
              />
            ))
          )}
        </div>
      </ReviewContainer>
    </>
  );
};

// 스타일 컴포넌트 추가
const ReviewWriteBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const ReviewForm = styled.form`
  display: flex;
  justify-content: center;
`;

const WriteInputBox = styled.input`
  font-family: "Pretendard";
  width: 246px;
  height: 40px;
`;

const WriteUploadBtn = styled.button`
  color: #ffff;
  width: 84px;
  height: 40px;
  padding: 0;
  margin: 0;
  background: linear-gradient(360deg, #116846 0%, #358868 100%);
  border-radius: 0px 4px 4px 0px;
  border: 0;
`;

const ReviewHr = styled.hr`
  margin-top: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0f3d2b;
  max-width: 415px;
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  overflow: auto;
  margin-bottom: 60px;
`;

const ReviewContent = styled.div`
  background-image: url(${mainGate});
  background-size: cover;
  background-position: center;
  width: 100%;
  flex-grow: 1;
`;

export default ReviewWriting;
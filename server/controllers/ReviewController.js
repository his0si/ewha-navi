const ReviewModel = require("../models/ReviewModel");

module.exports.getReviews = async (req, res) => {
    const { roadName } = req.query;
    if (!roadName) {
        return res.status(400).send({ message: "roadName is required" });
    }
    try {
        // 리뷰 조회
        const reviews = await ReviewModel.find({ roadName }).sort({ createdAt: -1 });
        res.status(200).send(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).send(error);
    }
};

module.exports.saveReview = async (req, res) => {
    const { roadName, rating, reviewText } = req.body;
    if (!rating || !reviewText || !roadName) {
        return res.status(400).send({ message: "Rating and reviewText are required" });
    }
    try {
        const newReview = await ReviewModel.create({ roadName, rating, reviewText });
        console.log("Save successfully...");
        res.status(201).send(newReview);
    } catch (err) {
        console.error("Can't save this data:", err);
        res.status(500).send(err);
    }
};

module.exports.getAverageRatingsForPaths = async (req, res) => {
    const { roadNames } = req.body; // 클라이언트에서 전달받은 roadName 배열
    if (!roadNames || !roadNames.length) {
        return res.status(400).send({ message: "roadNames are required" });
    }

    try {
        const averageRatings = await ReviewModel.aggregate([
            {
                $match: { roadName: { $in: roadNames } }, // roadNames에 포함된 값만 필터링
            },
            {
                $group: {
                    _id: "$roadName", // roadName 기준으로 그룹화
                    averageRating: { $avg: "$rating" }, // 각 그룹의 rating 평균
                },
            },
        ]);

        // 결과를 객체로 변환하여 응답 (e.g., { roadName: 평균 별점 })
        const result = averageRatings.reduce((acc, item) => {
            acc[item._id] = item.averageRating.toFixed(2);
            return acc;
        }, {});

        res.status(200).send(result);
    } catch (error) {
        console.error("Error fetching average ratings for paths:", error);
        res.status(500).send({ message: "Failed to fetch average ratings" });
    }
};


module.exports.getAverageRating = async (req, res) => {
    const { roadName } = req.query;

    if (!roadName) {
        return res.status(400).send({ message: "roadName is required" });
    }

    try {
        // MongoDB Aggregate를 사용하여 평균 계산
        const averageRatingData = await ReviewModel.aggregate([
            { $match: { roadName } }, // roadName 필터
            { $group: { _id: null, averageRating: { $avg: "$rating" } } }, // 평균 계산
        ]);

        // 평균 값 추출 (결과가 없으면 0 반환)
        const averageRating = averageRatingData[0]?.averageRating || 0;

        res.status(200).send({ averageRating });
    } catch (error) {
        console.error("Error calculating average rating:", error);
        res.status(500).send({ message: "Failed to calculate average rating" });
    }
};


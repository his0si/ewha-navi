const {Router} = require('express');

const {getReviews} = require("../controllers/ReviewController");
const {saveReview} = require("../controllers/ReviewController");
const {getAverageRatingsForPaths} = require("../controllers/ReviewController");
const {getAverageRating} = require("../controllers/ReviewController");

const route = Router();

route.get('/review-write/get', getReviews);
route.post('/review-write/save', saveReview);
route.post('/reviews/average-ratings', getAverageRatingsForPaths);
route.get('/getOneAverageRating', getAverageRating);
module.exports = route;
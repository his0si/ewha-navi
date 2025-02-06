const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    roadName : {type : String, required : true},
    rating : {type : Number, required : true},
    reviewText : {type : String, required: true}
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
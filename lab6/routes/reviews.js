//require express and express router as shown in lecture code
const express = require("express");
const router = express.Router();
const data = require("./../data");
const movieData = data.movies;
const reviewData = data.reviews;
const helper = require("../helpers");
const mongoCollections = require("./../config/mongoCollections");
const movies = mongoCollections.movies;
const { ObjectId } = require("mongodb");

async function getAverage(movieId){
  const average = await movies();
  const getAverage =  await average.aggregate([{$match: {_id: ObjectId(movieId)}},
  {$set:{"overallRating":{$round:[{$avg:"$reviews.rating"},1]}}}]).toArray();
  const updatedInfo = await average.updateOne({_id: ObjectId(movieId)},{$set: {"overallRating":getAverage[0].overallRating}});
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update movie successfully";
  }
  const reviewNew = await movieData.getMovieById(movieId);
return reviewNew;
}


router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try{
      var Id = helper.idCheck(req.params.movieId);
    }catch(e){
      res.status(400).json({error: e})
    }
    try{
    const review = await reviewData.getAllReviews(Id);
    res.json(review)
    }catch(e){
      res.status(404).json({error:e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try{
      var Id = helper.idCheck(req.params.movieId);
    }catch(e){
      res.status(400).json({error:e});
    }
    let reviewInfo = req.body;
    try{
      var reviewTitle = helper.plotCheck(reviewInfo.reviewTitle);
      var reviewerName = helper.nameCheck(reviewInfo.reviewerName);
      var review = helper.plotCheck(reviewInfo.review);
      var rating = helper.reivewratingCheck(reviewInfo.rating);
    }
    catch(e){
      res.status(400).json({error:e});
    }
    try{
    const newReview = await reviewData.createReview(
      Id,
      reviewTitle,
      reviewerName,
      review,
      rating
    )
    const movie = await movieData.getMovieById(Id);
      if(movie.reviews.length > 0){
        const updateM2review = await getAverage(Id);
        res.json(updateM2review)
      }else{
      res.json(newReview)}}
    catch(e){
      console.log(e);
      res.status(404).json({error:e});
    }
    
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try{
      var Id = helper.idCheck(req.params.reviewId); 
    }catch(e){
      res.status(404).json({error:e});
    }
    try{
    const review = await reviewData.getReview(Id);
    res.json(review)}
    catch(e){
      res.status(404).json({error:e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      var Id = helper.idCheck(req.params.reviewId);
      const movieCollection = await movies();
      const movie = await movieCollection.find({ "reviews": { $elemMatch: { "_id": Id  } } }).toArray();
      if(movie === undefined || movie === null || movie.length === 0){
        throw "No review with that ID";
      }
      let movieID = movie[0]._id.toString();
      const delinfo = await reviewData.removeReview(Id);
      const getmovie = await movieData.getMovieById(movieID);
    if(getmovie.reviews.length > 0 ){
      const updateM2review = await getAverage(movieID);
      res.json(updateM2review);
    }else{
    res.json(delinfo);
    }
    }catch(e){
      console.log(e);
      res.status(404).json({error:e});
    }
  });

  module.exports = router;
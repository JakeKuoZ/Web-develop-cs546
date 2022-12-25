const mongoCollections = require("./../config/mongoCollections");
const movies = mongoCollections.movies;
const { ObjectId } = require("mongodb");
const helper = require("./../helpers");
const movieData = require("./movies");

//const { movies } = require("./../config/mongoCollections");





const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  movieId = helper.idCheck(movieId);
  reviewTitle = helper.plotCheck(reviewTitle);
  reviewerName = helper.nameCheck(reviewerName);
  review = helper.plotCheck(review);
  rating = helper.reivewratingCheck(rating);

  let newid = ObjectId();
  let id = newid.toString();
  let date = new Date();
  let month = date.getMonth()+1;
  let day = date.getDate();
  if(month < 10){
    month = "0" + month;
  }
  if(day < 10){
    day = "0" + day;
  }
  let currDate = `${month}/${day}/${date.getFullYear()}`
  let newReview = {
    _id: id,
    reviewTitle: reviewTitle,
    reviewDate: currDate,
    reviewerName : reviewerName,
    review: review,
    rating: rating
  }
const movieCollection = await movies();
const insertInfo = await movieCollection.updateOne({ _id: ObjectId(movieId) }, { $push: { reviews: newReview } });
if(insertInfo.acknowledged !== true){
  throw "Cant create reviews"
}
const reviewNew = await movieData.getMovieById(movieId);
return reviewNew;
};

const getAllReviews = async (movieId) => {
  movieId = helper.idCheck(movieId);

  const movies = await movieData.getMovieById(movieId);
  let allReviews = [];
  
  for (const iterator of movies.reviews) {
    allReviews.push(iterator);
  }
  return allReviews;
  
};

const getReview = async (reviewId) => {
  reviewId = helper.idCheck(reviewId);

  const movieCollection = await movies();
  const movie = await movieCollection.find({ "reviews": { $elemMatch: { "_id": reviewId  } } }).toArray();
  if(movie.length === 0 || movie === null ||  movie === undefined){
    throw "No review found for given ID";
  }
  let review;
  for (const iterator of movie[0].reviews) {
    if(iterator._id === reviewId){
      review = iterator
    }
}
  if(!review){
    throw "Cant find review by given id";
  }
  else{
    return review;
  }

}

const removeReview = async (reviewId) => {
  reviewId = helper.idCheck(reviewId);

  const movieCollection = await movies();
  const movie = await movieCollection.find({ "reviews": { $elemMatch: { "_id": reviewId  } } }).toArray();
  if(movie === null || movie === undefined || movie.length === 0){
    throw "No review found for given ID";
  }
  const movie_id = movie[0]._id.toString()
  const updatedInfo = await movieCollection.updateMany({},{$pull: {"reviews": {"_id": reviewId}}})
  if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
      throw 'Delete failed';
  return await movieData.getMovieById(movie_id);
}

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};

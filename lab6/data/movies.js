const mongoCollections = require("./../config/mongoCollections");
const movies = mongoCollections.movies;
const { ObjectId } = require("mongodb");
const helper = require("./../helpers");

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  title = helper.titleCheck(title);
  genres = helper.genreCheck(genres);
  rating = helper.ratingCheck(rating);
  studio = helper.studioCheck(studio);
  director = helper.nameCheck(director);
  castMembers = helper.castMembersCheck(castMembers);
  dateReleased = helper.dateCheck(dateReleased);
  runtime = helper.runtimeCheck(runtime);
  plot = helper.plotCheck(plot);

  const movieCollection = await movies();
  let newMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews:[],
    overallRating: 0
  };
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not create moive";

  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId);
  return movie;};

const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({},{projection:{_id:1,title:1}}).toArray();
  if (!movieList) throw "Could not get all movies";
  return movieList;
};

const getMovieById = async (movieId) => {
  movieId = helper.idCheck(movieId);
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({_id: ObjectId(movieId) });
  if (movie === null) throw "No movie with that id";
  return movie;
};

const removeMovie = async (movieId) => {

  id = helper.idCheck(movieId);
  
  const movieCollection = await movies();
  
  const deletionInfo = await movieCollection.deleteOne({ _id: ObjectId(movieId) });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${id}`;
  }
  return {movieId: id,deleted: true };
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

  title = helper.titleCheck(title);
  genres = helper.genreCheck(genres);
  rating = helper.ratingCheck(rating);
  studio = helper.studioCheck(studio);
  director = helper.nameCheck(director);
  castMembers = helper.castMembersCheck(castMembers);
  dateReleased = helper.dateCheck(dateReleased);
  runtime = helper.runtimeCheck(runtime);
  plot = helper.plotCheck(plot);

  const movieCollection = await movies();
  const updatedMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
  };

  const updatedInfo = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},{$set: updatedMovie} 
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update movie successfully";
  }

  return await getMovieById(movieId);
};


module.exports = {
  createMovie,
  getMovieById,
  getAllMovies,
  removeMovie,
  updateMovie
};

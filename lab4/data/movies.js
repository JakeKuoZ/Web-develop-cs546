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
  let a = helper.inputValidate(
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime
  );
  title = helper.titleCheck(title);
  genres = helper.genreCheck(genres);
  rating = helper.ratingCheck(rating);
  studio = helper.studioCheck(studio);
  director = helper.nameCheck(director);
  castMembers = helper.castMembersCheck(castMembers);
  dateReleased = helper.dateCheck(dateReleased);
  runtime = helper.runtimeCheck(runtime);
  plot = plot.trim();

  const movieCollection = await movies();
  let newid = ObjectId();
  let id = newid.toString();
  let newMovie = {
    _id: id,
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
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not create moive";

  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId);
  return movie;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  if (!movieList) throw "Could not get all movies";
  return movieList;
};

const getMovieById = async (id) => {
  id = helper.idCheck(id);
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: id });
  if (movie === null) throw "No movie with that id";

  return movie;
};

const removeMovie = async (id) => {
  id = helper.idCheck(id);
  const movieCollection = await movies();
  const movieName = await getMovieById(id);
  
  const deletionInfo = await movieCollection.deleteOne({ _id: id });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${id}`;
  } else {
    console.log(`${movieName.title} has been successfully deleted!`)
  }
  return { deleted: true };
};

const renameMovie = async (id, newName) => {
  id = helper.idCheck(id);
  if (typeof newName !== "string") {
    throw "Illegal new name, string only.";
  }
  newName = helper.titleCheck(newName);
  
  const movieCollection = await movies();
  const updatedName = {
    title: newName,
  };

  const updatedInfo = await movieCollection.updateOne(
    { _id: id },
    { $set: updatedName }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update movie successfully";
  }

  return await getMovieById(id);
};

module.exports = {
  createMovie,
  getMovieById,
  getAllMovies,
  removeMovie,
  renameMovie,
};

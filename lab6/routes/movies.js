//require express and express router as shown in lecture code
const mongoCollections = require("./../config/mongoCollections");
const movies = mongoCollections.movies;
const express = require("express");
const router = express.Router();
const data = require("./../data");
const movieData = data.movies;
const helper = require("./../helpers");


router
  .route('/')
  .get(async (req, res) => {
    try{
      const movieList = await movieData.getAllMovies();
      res.json(movieList);
    }catch(e){
      res.status(500).json({error:e});
    }
    
  })
  .post(async (req, res) => {
    //code here for POST
    let movieInfo = req.body;
    try{
      var title = helper.titleCheck(movieInfo.title);
      var plot = helper.plotCheck(movieInfo.plot);
      var genres = helper.genreCheck(movieInfo.genres);
      var rating = helper.ratingCheck(movieInfo.rating);
      var studio =helper.studioCheck(movieInfo.studio);
      var director =helper.nameCheck(movieInfo.director);
      var castMembers = helper.castMembersCheck(movieInfo.castMembers);
      var dateRealeased = helper.dateCheck(movieInfo.dateRealeased);
      var runtime = helper.runtimeCheck(movieInfo.runtime);
    }
    catch(e){
      res.status(400).json({error:e});
    }
    try {
      const newMovie = await movieData.createMovie(
        title,
        plot,
        genres,
        rating,
        studio,
        director,
        castMembers,
        dateRealeased,
        runtime
      );
      res.status(200).json(newMovie);
  }
  catch(e){
    res.sendStatus(500).json({error:e});
  }});

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try{
      var ID = helper.idCheck(req.params.movieId);
    }
    catch(e){
      res.status(400).json({error:e});
    }

    try{
      const movie = await movieData.getMovieById(ID);
      res.status(200).json(movie);
    }catch(e){
      res.status(404).json({error:e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      var Id = helper.idCheck(req.params.movieId);
    }catch(e){
      res.status(400).json({error:e});
    }

    try{
    var delMovie = await movieData.removeMovie(Id);
      res.json(delMovie);
    }catch(e){
      res.status(404).json({error: e});
    }
  
  })
  .put(async (req, res) => {
    //code here for PUT
    let updateInfo = req.body;
    
    try{
      var Id = helper.idCheck(req.params.movieId)
      var title = helper.titleCheck(updateInfo.title);
      var plot = helper.plotCheck(updateInfo.plot);
      var genres = helper.genreCheck(updateInfo.genres);
      var rating = helper.ratingCheck(updateInfo.rating);
      var studio =helper.studioCheck(updateInfo.studio);
      var director =helper.nameCheck(updateInfo.director);
      var castMembers = helper.castMembersCheck(updateInfo.castMembers);
      var dateRealeased = helper.dateCheck(updateInfo.dateRealeased);
      var runtime = helper.runtimeCheck(updateInfo.runtime);
    }
    catch(e){
      res.status(400).json({error:e});
    }
    try{
      const movie = await movieData.getMovieById(Id);
      var reviews = movie.reviews;
    }catch(e){
      res.status(404).json({error:e});
    }
    try {
      const updatedmovie = await movieData.updateMovie(
        Id,
        title,
        plot,
        genres,
        rating,
        studio,
        director,
        castMembers,
        dateRealeased,
        runtime);
      res.json(updatedmovie);
    } catch (e) {
      res.status(404).json({error: e});
    }
    try{
      const movieCollection = await movies();
      for (let index = 0; index < reviews.length; index++) {
        await movieCollection.updateOne({ _id: ObjectId(Id) }, { $push: { reviews: reviews[index] } });
        index++
      }
    }
    catch(e){
      res.status(404).json({error:e});
    }
  });

  module.exports = router;

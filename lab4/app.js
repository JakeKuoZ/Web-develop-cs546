/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

const movies = require("./data/movies");
const connection = require("./config/mongoConnection");
const {ObjectId} = require("mongodb");


let yesman = undefined;
let shaw = undefined;
let fight = undefined; 

const main = async () => {

  const db = await connection.dbConnection();
  await db.dropDatabase();
  //1. Create a Movie of your choice.2. Log the newly created Movie. (Just that movie, not all movies)
  try {
     yesman = await movies.createMovie(
      "yesman",
      "hello",
      ["sdssdd"],
      "PG-13",
      "Warner Bros",
      "Peyton Reed",
      ["Jim Carrey","Zooey Deschanel","Bradley Cooper","Terence Stamp"],
      "12/09/2008",
      "02h 24MIN"
    );
    console.log(yesman);
  } catch (e) {
    console.log(e);
  }
 //Create another movie of your choice.
  try {
     shaw = await movies.createMovie(
      "The Shawshank Redemption",
      "Man who wronged put in prison and escaped",
      ["Prison","Drama","Mystery"],
      "R",
      "Columbia Pictures",
      "Frank Darabont",
      ["Tim Robbins","Morgan Freeman","Bob Gunton","William Sadler"],
      "09/23/1994",
      "2h 22min"
    );
  } catch (e) {
    console.log(e);
  }

//Query all movies, and log them all
  try {
    const movieList = await movies.getAllMovies();
    console.log(movieList);
  } catch (e) {
    console.log(e);
  }

//Create the 3rd movie of your choice.Log the newly created 3rd movie. (Just that movie, not all movies)
  try {
    fight = await movies.createMovie(
      "Fight Club",
      "A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden",
      ["Drama","crime","psycho"],
      "R",
      "Fox pictures",
      "David Fincher",
      ["Brad Pitt","Edward Norton","Helena Carter"],
      "12/31/2021",
      "9h 30min"
    );
    console.log(fight);
  } catch (e) {
    console.log(e);
  }
  //Rename the first movie Log the first movie with the updated name. 
  try{
    let id = ObjectId();
    let newid = id.toString();
    const newnamed = await movies.renameMovie(yesman._id,"Superman");
    console.log(newnamed);
  }
  catch(e){
    console.log(e);
  }
//Remove the second movie you created.
  try{
    const remove = await movies.removeMovie(shaw._id);
  }
 catch(e){
  console.log(e);
 }
//Query all movies, and log them all
 try{
  const newMovieList = await movies.getAllMovies();
  console.log(newMovieList);
 }catch(e){
  console.log(e);
 }

//  try{
//   const newMovieList = await movies.getMovieById("634c066cfd22b566b18fc1ef");
//   console.log(newMovieList);
//  }catch(e){
//   console.log(e);
//  }

//Try to create a movie with bad input parameters to make sure it throws errors.
 try{
  const bad = await movies.createMovie(111,222,333,444);
 }catch(e){
  console.log(e);
 }
 
//  try{
//   const bad = await movies.createMovie(
//     ["Fight Club"],
//   "A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden",
//   ["Drama","crime","psycho"],
//   "R",
//   "Fox pictures",
//   "David Fincher",
//   ["Brad Pitt","Edward Norton","Helena Carter"],
//   "12/31/2021",
//   "9h 30min");
//  }catch(e){
//   console.log(e);
//  }

//  try{
//   const bad = await movies.createMovie(
//     "Fight Club",
//   "A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden",
//   ["Drama","crime","psycho"],
//   "R",
//   "Fox pictures",
//   "David Fincher",
//   ["   ","Edward Norton","Helena Carter"],
//   "12/31/2021",
//   "9h 30min");
//  }catch(e){
//   console.log(e);
//  }

// try{
//   const bad = await movies.createMovie();
//  }catch(e){
//   console.log(e);
//  }

//Try to remove a movie that does not exist to make sure it throws errors.
 try{
  const bad = await movies.removeMovie("asdasd");
 }catch(e){
  console.log(e);
 }
 //Try to rename a movie that does not exist to make sure it throws errors.
 try{
  const bad = await movies.renameMovie();
 }catch(e){
  console.log(e);
 }
 //Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
 try{
  const bad = await movies.renameMovie(fight._id,[1,2,3]);
 }catch(e){
  console.log(e);
 }
//Try getting a movie by ID that does not exist to make sure it throws errors.
 try{
  const bad = await movies.getMovieById("ima a fake id");
 }catch(e){
  console.log(e);
 }

 try{
  const bad = await movies.getMovieById(1);
 }catch(e){
  console.log(e);
 }

// //Try getting a movie by ID that does not exist to make sure it throws errors.
//  try{
//   let newId = ObjectId();
//   let id = newId.toString();
//   const bad = await movies.getMovieById(id);
//  }catch(e){
//   console.log(e);
//  }


  
  await connection.closeConnection();
  console.log('Done!');
};

main();

const movies = require("./../data/movies");
const reviews = require("./../data/reviews");
const connection = require("./../config/mongoConnection");

async function main() {
  const db = await connection.dbConnection();
  // await db.dropDatabase();

  // try {
  //     yesman = await movies.createMovie(
  //      "yesman",
  //      "hello",
  //      ["sdssdd"],
  //      "PG-13",
  //      "Warner Bros",
  //      "Peyton Reed",
  //      ["Jim Carrey","Zooey Deschanel","Bradley Cooper","Terence Stamp"],
  //      "12/09/2008",
  //      "02h 24MIN"
  //    );
  //  } catch (e) {
  //    console.log(e);
  //  }
  //Create another movie of your choice.
  //  try {
  //     shaw = await movies.createMovie(
  //      "The Shawshank Redemption",
  //      "Man who wronged put in prison and escaped",
  //      ["Prison","Drama","Mystery"],
  //      "R",
  //      "Columbia Pictures",
  //      "Frank Darabont",
  //      ["Tim Robbins","Morgan Freeman","Bob Gunton","William Sadler"],
  //      "09/23/1994",
  //      "2h 22min"
  //    );
  //  } catch (e) {
  //    console.log(e);
  //  }

  //  try {
  //    fight = await movies.createMovie(
  //      "Fight Club",
  //      "A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden",
  //      ["Drama","crime","psycho"],
  //      "R",
  //      "Fox pictures",
  //      "David Fincher",
  //      ["Brad Pitt","Edward Norton","Helena Carter"],
  //      "12/31/2021",
  //      "9h 30min"
  //    );
  //   // console.log(fight);
  //  } catch (e) {
  //    console.log(e);
  //  }

  try {
     //const movie = await reviews.createReview("6364649fd8817cf61f636db0","i dunno what to say","asds bbaac","i dunno what to eat",0.32);
    //    const movie1 = await reviews.createReview("6364054bc68b51491ea3d4f5","supa","kuo zhang","op",4.3);
     // const review = await reviews.getAllReviews("635c91f8bf89ca79c64b93bb");
    //const movieList = await reviews.removeReview("63628e88a13e65c606599e7c");
   //const movieList = await reviews.getAllReviews("635c91f8bf89ca79c64b93bc")
   //const findre = await reviews.removeReview("63645cd0dfce195554c20668");
   //const getre = await reviews.getReview("6362b6139ed09de5a11bf06f");
   // const findre = await reviews.removeReview("6362d4b8c94e83474936a655");
  //const move = await movies.getMovieById("635c91f8bf89ca79c64b93bc");
  //const rem = await movies.removeMovie("635c91f8bf89ca79c64b93bb");
       //.log(move);
      // console.log(move);
  } catch (e) {
    console.log(e);
  }
  await connection.closeConnection();
  console.log("Done!");
}

main();

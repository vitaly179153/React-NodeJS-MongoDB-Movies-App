const express = require("express");
const app = express();
const mongoose = require("mongoose");
const FavoriteModel = require("./models/Favorites");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://vruser:vruser@moviesapp.actszdw.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/getFavorites", (req, res) => {
  FavoriteModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createFavorite", async (req, res) => {
  const favorite = req.body;
  const newFavorite = new FavoriteModel(favorite);
  await newFavorite.save();

  res.json(favorite);
});

app.post("/updateRating", async (req, res) => {
  const { title, rating } = req.body;

  // find the movie in the database using its title
  const movie = await FavoriteModel.findOne({ title: title });

  // update the movie's rating
  movie.rating = rating;
  await movie.save();

  res.json({ message: "Rating updated successfully" });
});

app.delete('/delete/:id', async (req,res)=> {
  const id = req.params.id
  await FavoriteModel.findByIdAndRemove(id).exec()
  res.send("deleted")
})

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});



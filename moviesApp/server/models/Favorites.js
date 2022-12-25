const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  poster: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: false,
  },
  
});

const FavoriteModel = mongoose.model("favorites", FavoriteSchema);
module.exports = FavoriteModel;

const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    celebrity: {
        type: Schema.Types.ObjectId,
        ref: "Celebrity"
      }
  }
)

module.exports = model("Movie", movieSchema)


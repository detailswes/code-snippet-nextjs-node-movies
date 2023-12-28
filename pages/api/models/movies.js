import mongoose from 'mongoose';
let Movie;
try {
  Movie = mongoose.model('Movie');
} catch (error) {
  const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    publishingYear: {
      type: Number,
      required: true,
    },
    poster: {
      type: String, 
      required: true,
    },
  });

  Movie = mongoose.model('Movie', movieSchema);
}

export default Movie;


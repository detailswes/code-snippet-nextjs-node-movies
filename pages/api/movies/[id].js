import { connectToDatabase } from "../database/db";
import Movie from "../models/movies";
import validateMovieInput from "../validation/movieUpdateValidation";
import authMiddleware from "../utils/middleware/jwtAuth";
import mongoose from "mongoose";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handleErrors = (res, status, message) => {
  res.status(status).json({ success: false, message });
};

const handleSuccess = (res, status, message, data = null) => {
  res.status(status).json({ success: true, message, data });
};

async function updateMovie(req, res) {
  try {
    await connectToDatabase();


      const { error, value } = validateMovieInput({
        title: req.body.title,
        publishingYear: parseInt(req.body.publishingYear),
        poster: req.body.poster,
      });

      if (error) {
        handleErrors(res, 400, error.details[0].message);
        return;
      }

      const movieId = req.query.id;
      const objectId = mongoose.Types.ObjectId.isValid(movieId)
        ? mongoose.Types.ObjectId.createFromHexString(movieId)
        : null;
      const existingMovie = await Movie.findById(objectId);

      if (!existingMovie) {
        handleErrors(res, 404, "Movie not found");
        return;
      }


      // Update the movie details
      existingMovie.title = value.title;
      existingMovie.publishingYear = value.publishingYear;
      existingMovie.poster = value.poster

      await existingMovie.save();

      handleSuccess(res, 200, "Movie updated successfully", existingMovie);
  } catch (error) {
    handleErrors(res, 500, "Internal Server Error");
  }
}

async function getMovieById(req, res) {
  try {
    await connectToDatabase();

    const movieId = req.query.id;
    const objectId = mongoose.Types.ObjectId.isValid(movieId)
      ? mongoose.Types.ObjectId.createFromHexString(movieId)
      : null;
    const movie = await Movie.findById(objectId);

    if (!movie) {
      handleErrors(res, 404, "Movie not found");
      return;
    }

    handleSuccess(res, 200, "Movie get successfully", movie);
  } catch (error) {
    console.error(error);
    handleErrors(res, 500, "Internal Server Error");
  }
}
  //Delete movie
  async function deleteMovieById(req, res) {
    try {
      await connectToDatabase();
  
      const movieId = req.query.id;
      const objectId = mongoose.Types.ObjectId.isValid(movieId) ? mongoose.Types.ObjectId.createFromHexString(movieId): null;
  
      const movieToDelete = await Movie.findById(objectId);
  
      if (!movieToDelete) {
        handleErrors(res, 404, 'Movie not found');
        return;
      }
  
       await movieToDelete.deleteOne(objectId);
  
      handleSuccess(res, 200, 'Movie deleted successfully');
    } catch (error) {
      console.error(error);
      handleErrors(res, 500, 'Internal Server Error');
    }
  }


const applyAuthMiddleware = (handler) => authMiddleware(handler);

const handlers = {
  PATCH: applyAuthMiddleware(updateMovie),
  GET: applyAuthMiddleware(getMovieById),
  DELETE: applyAuthMiddleware(deleteMovieById),
};

export default async function handler(req, res) {
  const method = req.method.toUpperCase();
  const selectedHandler = handlers[method];

  if (selectedHandler) {
    selectedHandler(req, res);
  } else {
    handleErrors(res, 405, "Method Not Allowed");
  }
}




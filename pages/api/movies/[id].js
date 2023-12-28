import { connectToDatabase } from '../database/db';
import Movie from '../models/movies';
import upload from '../utils/imageUpload/multer';
import validateMovieInput from '../validation/movieUpdateValidation';
import fs from 'fs';
import authMiddleware from '../utils/middleware/jwtAuth';
import mongoose from 'mongoose';

export const config = {
  api: {
    bodyParser: false,
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

    upload.single('poster')(req, res, async function (err) {
      if (err) {
        handleErrors(res, 500, 'Error uploading file');
        return;
      }

      const { error, value } = validateMovieInput({
        title: req.body.title,
        publishingYear: parseInt(req.body.publishingYear),
        poster: req.file,
      });

      if (error) {
        handleErrors(res, 400, error.details[0].message);
        return;
      }

      const movieId = req.query.id;
      const objectId = mongoose.Types.ObjectId.isValid(movieId)? mongoose.Types.ObjectId.createFromHexString(movieId): null;
      const existingMovie = await Movie.findById(objectId);

      if (!existingMovie) {
        if(req.file){
          fs.unlinkSync(req?.file?.path);
        }
        handleErrors(res, 404, 'Movie not found');
        return;
      }

      // Delete the old poster image
      const oldPosterPath = `public/movies/${existingMovie.poster.split('/').pop()}`;
      if (fs.existsSync(oldPosterPath) && req.file) {
        fs.unlinkSync(oldPosterPath);
      }

      // Update the movie details
      existingMovie.title = value.title;
      existingMovie.publishingYear = value.publishingYear;
      existingMovie.poster = req.file ? `${process.env.BASE_URL}movies/${req.file.filename}` : existingMovie.poster;

      await existingMovie.save();

      handleSuccess(res, 200, 'Movie updated successfully', existingMovie);
    });
  } catch (error) {
    handleErrors(res, 500, 'Internal Server Error');
  }
}

const authenticatedUpdateMovie = authMiddleware(updateMovie);

export default authenticatedUpdateMovie;

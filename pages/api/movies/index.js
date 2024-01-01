import { connectToDatabase } from '../database/db';
import Movie from '../models/movies';
import authMiddleware from '../utils/middleware/jwtAuth';
import upload from '../utils/imageUpload/multer';
import validateMovieInput from '../validation/movieCreateValidation';
import fs from 'fs';


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

async function createMovie(req, res) {
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
        if(req.file){
          fs.unlinkSync(req?.file?.path);
        }
        handleErrors(res, 400, error.details[0].message);
        return;
      }

      const newMovie = new Movie({
        title: value.title,
        publishingYear: value.publishingYear,
        poster: `${process.env.BASE_URL}movies/${req.file.filename}`,
      });

      await newMovie.save();
      handleSuccess(res, 201, 'Movie created successfully',  newMovie);
      
    });
  } catch (error) {
    handleErrors(res, 500, 'Internal Server Error');
  }
}

async function listMovies(req, res) {
  try {
    await connectToDatabase();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const movies = await Movie.find().skip(skip).limit(pageSize);
    const totalCount = await Movie.countDocuments();

    res.status(200).json({ success: true, data: movies, totalCount: totalCount });
  } catch (error) {
    handleErrors(res, 500, 'Internal Server Error');
  }
}

// Apply authentication middleware dynamically
const applyAuthMiddleware = (handler) => authMiddleware(handler);

const handlers = {
  POST: applyAuthMiddleware(createMovie),
  GET: applyAuthMiddleware(listMovies),
};

export default async function handler(req, res) {
  const method = req.method.toUpperCase();
  const selectedHandler = handlers[method];

  if (selectedHandler) {
    selectedHandler(req, res);
  } else {
    handleErrors(res, 405, 'Method Not Allowed');
  }
}
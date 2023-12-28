import MoviesList from "../../components/movies/MoviesList";
import EmptyList from "../../components/movies/EmptyList";

const MyMovies = () => {
  return (
    <>
      <div className="container px-6">
        {/* The below code lines is for empty state */}
        {/* <EmptyList/> */}

        {/* below is for Movie list */}
        <MoviesList />
      </div>
    </>
  );
};

export default MyMovies;

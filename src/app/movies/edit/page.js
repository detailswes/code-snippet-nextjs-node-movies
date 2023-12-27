import MoviesForm from "../../../components/movies/moviesForm";


const EditMovie = () => {
  return (
    <div className="container px-6">
       <div className="h-screen py-32">
        <div className="w-full">
        <h1 className="mb-32">Edit</h1>
          <MoviesForm/>
        </div>
      </div>
    </div>
  )
}

export default EditMovie;

import MoviesForm from "components/MoviesForm";

const AddMovie = () => {
  return (
    <div className="container px-6">
      <div className="py-32">
        <div className="w-full">
          <h1 className="mb-32">Create a new movie</h1>
          <MoviesForm />
        </div>
      </div>
    </div>
  );
};

export default AddMovie;

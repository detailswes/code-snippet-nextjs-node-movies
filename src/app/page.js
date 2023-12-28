import MyMovies from "./movies/page";
import EmptyList from "../components/movies/EmptyList";



export default function Home() {
  return (
    <div className="container px-6">
      {/* The below code lines is for empty state */}
      {/* <EmptyList/> */}
      

      {/* below is for Movie list */}
      <MyMovies/>
      
    </div>
  );
}

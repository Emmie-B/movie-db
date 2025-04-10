import React, { useEffect, useState } from 'react'
import Search from './components/search'
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "flowbite-react";
import MovieCard from './components/MovieCard';

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.TMDB_API_KEY

const API_OPTION ={
  method: "GET",
  headers: {
    accept: 'application/json', 
    authorization: `Bearer ${API_KEY}`
  }

}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");;

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const notify = () => toast.error('oops! Something went wrong. Please try again');
  
  useEffect(() =>  {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
  
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
        const response = await fetch(endpoint, API_OPTION);
  
  
        if (!response.ok) {
      setIsLoading(false);
  
          throw new Error("can't fetch moview, please try again")
        }
  
        const data = await response.json()
  
        if(data.Response === false){
      setIsLoading(false);
  
          setErrorMessage(data.error || "Failed to fetch movies")
      notify();

          setMovies([]);
          return
        }
  
        setMovies(data.results || []);
      setIsLoading(false);
        console.table(data.results)
  
  
        
      } catch (error) {
        setIsLoading(false);
        notify();
  
        console.log(error)
        setErrorMessage("oops! Something went wrong")
        
      }
    }
    
    fetchMovies()}, [])
  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='hero banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> You’ll Love Without the Hassle</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

        <section className='all-movies'>
        <h2 className=''>All Movies</h2>

        {
          isLoading ? <Spinner color="success"  aria-label="Success spinner example" /> : (
            <ul>
              {
                movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              }
            </ul>
          )
        }
        {/* <button className='bg-amber-500' onClick={notify}>Make me a toast</button> */}
        <Toaster />


        </section>
      </div>
    </main>
  )
}

export default App
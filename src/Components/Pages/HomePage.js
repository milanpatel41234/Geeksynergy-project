import React, { useEffect, useState } from "react";
import style from "./HomePage.module.css";

function HomePage() {
  const [ListItems, setListItems] = useState([]);
  const [Language , setLanguage] = useState('kannada');

  
  async function fetchMovieList() {
    const apiUrl = "https://hoblist.com/api/movieList";
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "movies",
        language: Language,
        genre: "all",
        sort: "voting",
      }),
    };
    
    try {
      const response = await fetch(apiUrl, requestData);
      const data = await response.json();
      setListItems(data.result);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  }
  
  useEffect(() => {
    fetchMovieList();
  }, []);

  const HandleSearch = ()=>{
  fetchMovieList();
  }
  
  const MoviesList = ListItems.map((movie, index) => {
    return (
      <li key={index}>
        <div className={style.card}>
          <img src={movie.poster} alt={movie.name} />
          <div>
            <h4>{movie.title}</h4>
            <p>
              <b>Genre : </b>
              {movie.genre}
            </p>
            <p>
              <b>Director : </b>
              {movie.director[0]}
            </p>
            <p>
              <b>Starring : </b>
              {movie.stars[0]}
            </p>
            <p>
              <b>Language : </b>
              {movie.language}
            </p>
          </div>
        </div>
        <button>Watch Trailer</button>
      </li>
    );
  });

  return (
    <main className={style.main}>
      <div>
     <select placeholder="Search by language" value={Language} onChange={e=> setLanguage(e.target.value)}>
      <option value='kannada'>kannada</option>
      <option value='hindi'>Hindi</option>
      <option value='english'>English</option>
      <option value='tamil'>Tamil</option>
      <option value='malayalam'>Malayalam</option>
      <option value='all'>All</option>
     </select>
     <button onClick={HandleSearch} >Search</button>
     </div>
      <div className={style.container}>{MoviesList}</div>
    </main>
  );
}

export default HomePage;

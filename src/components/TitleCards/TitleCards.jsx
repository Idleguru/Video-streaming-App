import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [ApiData, setApiData] = useState([]);
  const CardRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWJiOTE2Y2YyMmQ0ZGE4MzA1ZTEzY2M2ZjA2YjU0NSIsInN1YiI6IjY2MzczNTliOTU5MGUzMDEyNmJjYWY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ugr2FZ9cQcfIhGw7hWCRlChHogk6BUZYoXNEQXSb8cQ'
    }
  };

  const handleEventListener = (event) => {
    if (event) {
      event.preventDefault();
      CardRef.current.scrollLeft += event.deltaY;
    }

  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=2`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    CardRef.current.addEventListener("Wheel", handleEventListener())
  }, [])

  return (
    <>
      <div className="title-cards">
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div className="card-list" ref={CardRef} >
          {
            ApiData.map((card, index) => {
              return (
                <Link to={`/player/${card.id}`}  className="card" key={index}>
                  <img src={"https://image.tmdb.org/t/p/w500" + card.backdrop_path} alt="" />
                  <p>{card.original_title}</p>
                </Link>
              )
            })
          }
        </div>

      </div>
    </>
  )
}

export default TitleCards
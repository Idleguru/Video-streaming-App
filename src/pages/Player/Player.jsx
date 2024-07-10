import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [ApiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWJiOTE2Y2YyMmQ0ZGE4MzA1ZTEzY2M2ZjA2YjU0NSIsInN1YiI6IjY2MzczNTliOTU5MGUzMDEyNmJjYWY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ugr2FZ9cQcfIhGw7hWCRlChHogk6BUZYoXNEQXSb8cQ'
    }
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results[0]))
      .catch(err => console.error(err));

  }, [])

  return (
    <>
      <div className="player">

        <img src={back_arrow_icon} onClick={() => navigate(-2)} style={{ cursor: 'pointer' }} alt="" />

        <iframe src={`https://www.youtube.com/embed/${ApiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>

        <div className="player-info">
          <p>{ApiData.published_at.slice(0, 10)}</p>
          <p>{ApiData.name}</p>
          <p>{ApiData.type}</p>
        </div>

      </div>

    </>
  )
}

export default Player
import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {LuDot} from 'react-icons/lu'

import Navbar from '../../components/Navbar'
import {
  API_KEY,
  apiStatusConstants,
  convertResponseObject,
} from '../../constants'
import Loader from '../../components/Loader'

import './index.css'

const MovieDetails = () => {
  const {movieId} = useParams()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [singleMovieDetails, setSingleMovieDetails] = useState(null)
  const [movieCastDetails, setMovieCastDetails] = useState(null)
  const getMovieDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const movieDataResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    )
    const movieData = await movieDataResponse.json()
    setSingleMovieDetails({
      id: movieData.id,
      posterPath: movieData.poster_path,
      originalTitle: movieData.original_title,
      runtime: movieData.runtime,
      rating: movieData.vote_average,
      releaseDate: movieData.release_date,
      genres: movieData.genres,
      overview: movieData.overview,
    })
    const movieCastDetailsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    )
    const movieCastData = await movieCastDetailsResponse.json()
    console.log(movieCastData.cast)
    setMovieCastDetails(
      movieCastData.cast.map(item => ({
        id: item.id,
        name: item.original_name,
        character: item.character,
        profilePath: item.profile_path,
      })),
    )

    setApiStatus(apiStatusConstants.success)
  }
  useEffect(() => {
    getMovieDetails()
  }, [])
  const renderMovieDetails = () => {
    const {
      posterPath,
      genres,
      originalTitle,
      rating,
      runtime,
      releaseDate,
      overview,
    } = singleMovieDetails

    return (
      <>
        <div className="movie-details-container">
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt="movie poster"
            className="movie-poster"
          />
          <div className="movie-details">
            <div className="movie-name-and-rating">
              <h2 className="movie-name">{originalTitle}</h2>
              <p className="movie-rating">Rating: {rating}</p>
            </div>
            <div className="duration-and-release-date">
              <p className="duration">{runtime} Mins</p>
              <LuDot />
              <p className="release-date">{releaseDate}</p>
            </div>
            <div className="genres-container">
              <h3 className="genre-heading">GENRES</h3>
              <ul className="genre-list">
                {genres.map(item => (
                  <li className="genre-item" key={item.id}>
                    <p className="genre">{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overview-container">
              <h3 className="overview-heading">OVERVIEW</h3>
              <p className="overview">{overview}</p>
            </div>
          </div>
        </div>
        <div className="movie-cast">
          <h3 className="movie-cast-heading">MOVIE CAST</h3>
          <ul className="movie-cast-list">
            {movieCastDetails.map(item => {
              const {id, name, character, profilePath} = item
              return (
                <li className="movie-cast-item" key={id}>
                  <img
                    className="cast-image"
                    alt="movie cast"
                    src={`https://image.tmdb.org/t/p/w500/${profilePath}`}
                  />
                  <p className="cast-name">{name}</p>
                  <p className="character-name">
                    Character Played: {character}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    )
  }
  const renderViewBasedOnAPI = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.success:
        return renderMovieDetails()
      default:
        return null
    }
  }
  return (
    <div className="movie-details-page">
      <Navbar />
      {renderViewBasedOnAPI()}
    </div>
  )
}

export default MovieDetails

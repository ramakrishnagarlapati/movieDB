import {withRouter} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails, history} = props
  const {id, originalTitle, overview, posterPath, rating} = movieDetails
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
  const onClickViewBtn = () => {
    history.push(`/movies/${id}`)
  }
  return (
    <li className="movie-card">
      <img src={imageUrl} alt="movie" className="movie-image" />
      <div className="movie-name-and-rating-wrapper">
        <p className="movie-card-name">{originalTitle}</p>
        <p className="movie-card-rating">Rating: {rating}</p>
      </div>
      <button className="view-button" type="button" onClick={onClickViewBtn}>
        View Details
      </button>
    </li>
  )
}

export default withRouter(MovieCard)

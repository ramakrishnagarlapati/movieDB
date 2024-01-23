import {useState, useEffect, useContext} from 'react'

import {FcPrevious} from 'react-icons/fc'

import Navbar from '../Navbar'
import Loader from '../Loader'
import {searchContext} from '../../context/searchContext'
import Pagination from '../Pagination'

import {
  API_KEY,
  apiStatusConstants,
  convertResponseObject,
} from '../../constants'

import './index.css'
import MovieCard from '../MovieCard'

const SharedPageComponent = ({pathName}) => {
  const [moviesList, setMoviesList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [pageNumber, setPageNumber] = useState(1)
  const {searchValue, setSearchValue} = useContext(searchContext)
  let url = ''
  if (pathName !== 'search') {
    url = `https://api.themoviedb.org/3/movie/${pathName}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
  } else {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=${pageNumber}`
  }

  const getMoviesData = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const response = await fetch(url)
    const data = await response.json()
    const {results} = data
    if (results.length === 0) {
      setApiStatus(apiStatusConstants.failure)
    } else {
      setMoviesList(results.map(item => convertResponseObject(item)))
      setApiStatus(apiStatusConstants.success)
    }
  }

  useEffect(() => {
    getMoviesData()
  }, [pageNumber, searchValue])

  const onClickPreviousBtn = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }
  const onClickNextBtn = () => {
    setPageNumber(pageNumber + 1)
  }

  const renderMoviesList = () => (
    <>
      <ul className="movie-page-movies-list">
        {moviesList.map(movieItem => (
          <MovieCard key={movieItem.id} movieDetails={movieItem} />
        ))}
      </ul>
      <Pagination
        onClickNextBtn={onClickNextBtn}
        onClickPreviousBtn={onClickPreviousBtn}
        pageNumber={pageNumber}
      />
    </>
  )

  const renderFailureView = () => (
    <p className="no-movies-text">
      We're sorry there are no movies related to
      <span className="search-value">{searchValue}</span>
    </p>
  )

  const renderViewBasedOnAPI = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.success:
        return renderMoviesList()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }
  return (
    <div className="movie-page">
      <Navbar />
      <main className="movie-page-content">
        <h2 className="movie-page-heading">
          {pathName[0].toUpperCase() + pathName.slice(1).toLowerCase()}
        </h2>
        <div className="movie-page-movies-container">
          {renderViewBasedOnAPI()}
        </div>
      </main>
    </div>
  )
}

export default SharedPageComponent

import {useState, useEffect, useContext} from 'react'
import {withRouter, Link} from 'react-router-dom'

import {searchContext} from '../../context/searchContext'

import './index.css'

const Navbar = props => {
  const {setSearchValue} = useContext(searchContext)
  const [inputValue, setInputValue] = useState('')
  const {history} = props
  const onFormSubmit = e => {
    e.preventDefault()
    setSearchValue(inputValue)
    history.push('/search')
  }

  return (
    <div className="movie-app-header">
      <header className="nav-header">
        <h1 className="app-title">movieDB</h1>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <h2 className="nav-link-text">Popular</h2>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/top-rated" className="nav-link">
                <h2 className="nav-link-text">Top Rated</h2>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/upcoming" className="nav-link">
                <h2 className="nav-link-text">Upcoming</h2>
              </Link>
            </li>
          </ul>
          <form className="search-form" onSubmit={onFormSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Search"
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </nav>
      </header>
    </div>
  )
}

export default withRouter(Navbar)

//   <div className="mobile-search-bar">
//     <form onSubmit={onFormSubmit} className="mobile-search-form">
//       <input
//         type="search"
//         value={inputValue}
//         onChange={e => setInputValue(e.target.value)}
//         placeholder="Search"
//         className="mobile-search-input"
//       />
//       <button type="submit" className="mobile-search-button">
//         Search
//       </button>
//     </form>
//   </div>

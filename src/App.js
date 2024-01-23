import {Switch, Route} from 'react-router-dom'

import Popular from './pages/Popular'
import Upcoming from './pages/Upcoming'
import TopRated from './pages/TopRated'
import SearchPage from './pages/SearchPage'
import MovieDetails from './pages/MovieDetails'

import SearchContextProvider from './context/searchContext'

import './App.css'

// write your code here
const App = () => (
  <SearchContextProvider>
    <Switch>
      <Route exact path="/" component={Popular} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/movies/:movieId" component={MovieDetails} />
    </Switch>
  </SearchContextProvider>
)

export default App

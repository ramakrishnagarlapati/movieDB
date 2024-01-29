export const API_KEY = 'a799368dba979aae1ccc5bfced134be3'

export const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export const convertResponseObject = object => ({
  id: object.id,
  originalTitle: object.title,
  overview: object.overview,
  posterPath: object.poster_path,
  rating: object.vote_average,
})

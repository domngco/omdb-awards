import { gql } from '@apollo/client'

export const GET_MOVIE_SEARCH = gql`
    query GetMovieSearch($search: String) {
        movies(s: $search) 
        @rest(method: "GET", path: "?type=movie&apikey=${process.env.REACT_APP_API_KEY}&{args}"){
            Search {
                imdbID
                Title
                Year
                Poster
            }
        }
    }
`

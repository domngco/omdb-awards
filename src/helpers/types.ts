import { ApolloError } from '@apollo/client'

interface MovieData {
    Title: string
    Year: string
    imdbID: string
    Poster: string
}

interface NominationProps {
    nominations: MovieData[]
    onHandleRemove: Function
}

interface MovieDataSearch {
    movies: {
        Search: Array<MovieData>
    }
}

interface SearchProps {
    searchValue: string
    data?: MovieDataSearch
    loading?: boolean
    error?: ApolloError
    setNominationList: Function
    nominations: MovieData[]
}

export type { MovieData, NominationProps, SearchProps }

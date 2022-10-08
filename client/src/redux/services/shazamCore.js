import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"   // createApi - extra-line-3   // fetchBaseQuery - extra-line-5


export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {     // adding headers to the api request
            headers.set('X-RapidAPI-Key', 'd0c60faf6amshd2e3ebb8b2528c1p18f5f8jsn1cc6d8d21b22');
            return headers;
        }
    }),
    endpoints: (builder) => ({            // these are the multiple endpoints - visit: https://redux-toolkit.js.org/rtk-query/api/createApi
        getTopCharts: builder.query({ query: () => '/charts/world' }),
        getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),
        getSongDetails: builder.query({ query: ({ songId }) => `/tracks/details?track_id=${songId}` }),
        getSongRelated: builder.query({ query: ({ songId }) => `/tracks/related?track_id=${songId}` }),
        getArtistDetails: builder.query({ query: ({ artistId }) => `/artists/details?artist_id=${artistId}` }),
        getSongsByCountry: builder.query({ query: (country) => `/charts/country?country_code=${country}` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?query=${searchTerm}&search_type=SONGS_ARTISTS` }),
    }),
})

export const {
    // to create hook - general hook, use(endpoint)Query
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery
} = shazamCoreApi;
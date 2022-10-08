import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Loader, Error, DetailsHeader, RelatedSongs } from "../components"
import { setActiveSong, playPause } from "../redux/features/playerSlice"
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore"

const SongDetails = () => {
    const { songId } = useParams()
    const dispatch = useDispatch()
    const { activeSong, isPlaying } = useSelector((state) => state.player)

    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songId })   // to remove this object destructuring ({songId}) ,  i also need to remove the object destructing in shazamcore.js in services

    const { data, error, isFetching: isFetchingRelatedSongs } = useGetSongRelatedQuery({ songId })

    if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching Song Details" />
    if (error) return <Error />

    const handlePlayClick = (song, i) => {
        console.log("in play")
        dispatch(setActiveSong({ song, data, i }))
        dispatch(playPause(true))
    }
    const handlePauseClick = (song, i) => {
        dispatch(playPause(false))
        console.log("in pause")
    }


    return (
        <div className="flex flex-col" >


            <DetailsHeader artistId="" songData={songData} />


            <div className="mb-10" >
                <h2 className="text-white  text-3xl font-bold " >Lyrics:</h2>
                <div className="mt-5" >
                    {
                        songData?.sections[1].type === 'LYRICS' ?
                            songData?.sections[1].text.map((line, i) => (
                                <p key={i} className="text-gray-400 text-base my-1" >{line}</p>
                            ))
                            :
                            <p>Sorry, no lyrics found.</p>
                    }
                </div>
            </div>


            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePlayClick={handlePlayClick}
                handlePauseClick={handlePauseClick}

            />


        </div>
    )
}

export default SongDetails;

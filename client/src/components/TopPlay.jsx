import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper"

import PlayPause from "./PlayPause"
import { playPause, setActiveSong } from "../redux/features/playerSlice"
import { useGetTopChartsQuery } from "../redux/services/shazamCore"

const TopPlay = () => {

  const dispatch = useDispatch()
  const divRef = useRef(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data } = useGetTopChartsQuery()
  const topPlays = data?.slice(0, 5);

  useEffect(() => {   // this will execute each time the page reloaded
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  const handlePauseClick = (song, i) => {
    dispatch(playPause(false))
  }

  const TopChartCard = ({ song, index, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
    <>

      <div className="w-[98%] flex flex-row items-center hover:bg-[#4c426e] py-1.5 px-4 rounded-lg cursor-pointer mb-2"  >
        <h3 className="font-bold text-base text-white mr-3" >{index + 1}.</h3>                        {/* index */}
        <div className="flex flex-1 flex-row justify-between items-center" >
          <img className="w-14 h-14 rounded-lg " src={song?.images?.coverart} alt={song?.title} /> {/* image */}
          <div className="flex flex-1 flex-col justify-center mx-3 " >
            <Link to={`/songs/${song?.key}`} >                                  {/* title */}
              <p className="text-xl font-4 text-white" >{song?.title}</p>
            </Link>
            <Link to={`/artists/${song?.artists[0].adamid}`} >                  {/* subtitle */}
              <p className="font-3  text-gray-300 mt-1" >{song?.subtitle}</p>
            </Link>
          </div>
        </div>
        <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick} />
      </div>
    </>
  )

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col" >



      {/* Top Charts */}
      <div className="w-full flex flex-col" >
        {/* Heading */}
        <div className="flex flex-row justify-between items-center" >
          <h2 className="text-white font-bold text-2xl " >Top Charts</h2>
          <Link to="/top-charts" >
            <p className="text-gray-300 text-base cursor-pointer" >See more</p>
          </Link>
        </div>
        {/* list of top charts */}
        <div className="mt-4 flex flex-col gap-1" >
          {
            topPlays?.map((song, i) => (
              <TopChartCard
                key={i}
                song={song}
                index={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePlayClick={() => handlePlayClick(song, i)}
                handlePauseClick={() => handlePauseClick(song, i)}
              />
            ))
          }
        </div>
      </div>



      {/* Top Artists */}
      <div className="w-full flex flex-col mt-8" >
        {/* Heading */}
        <div className="flex flex-row justify-between items-center" >
          <h2 className="text-white font-bold text-2xl " >Top Artists</h2>
          <Link to="/top-artists" >
            <p className="text-gray-300 text-base cursor-pointer" >See more</p>
          </Link>
        </div>
      </div>
      {/* Slider */}
      <Swiper
        slidesPerView='auto'
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4 flex this"
      >
        {
          topPlays?.map((song, i) => (
            <SwiperSlide key={song?.key} style={{ width: '25%', height: 'auto', display: "flex" }} className="shadow-lg flex rounded-full animate-sliderright" >
              <Link to={`/artists/${song?.artists[0].adamid}`} >
                <img src={song?.images.background} alt="name" className="rounded-full w-4 h-4 object-cover" />
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>



    </div>
  )

}

export default TopPlay;

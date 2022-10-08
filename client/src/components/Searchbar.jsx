
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiSearch } from "react-icons/fi"

const Searchbar = () => {

  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
  }

  return (
    <form onSubmit={handleSubmit} autocomplete="off" className="w-[50%] text-gray-400 focus-within:text-gray-600 " >
      <label htmlFor="search-field" className="sr-only" >{/* ???? */}
        Search All Songs
      </label>
      <div className="flex flex-row justify-start items-center " >
        <FiSearch className="w-5 ml-4 h-5" />
        <input
          name="search-field"
          autocomplete="off"
          placeholder="search"
          type="search"
          value={searchTerm}
          id="search-field"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none border-none placeholder-gray-500 text-base text-white p-4 "

        />
      </div>

    </form>
  )
}

export default Searchbar;

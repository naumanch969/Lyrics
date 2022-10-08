import { useState } from "react"
import { NavLink } from "react-router-dom"
import { RiCloseLine } from "react-icons/ri"
import { HiOutlineMenu } from "react-icons/hi"
import { logo } from "../assets"
import { useNavigate } from "react-router-dom"
import { links } from "../assets/constants"


const Sidebar = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const NavLinks = ({ handleClick }) => (
    <div className="mt-10 " >
      {
        links.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            onClick={() => handleClick && handleClick()}
            className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          >
            <item.icon className="w-6 h-6 mr-2" />
            {item.name}
          </NavLink>
        ))
      }
    </div>
  )


  return (
    <>

      <div className="md:flex hidden flex-col w-[200px] py-10 px-4 bg-[#191624] " >
        <img src={logo} alt="logo" onClick={() => navigate("/")} className="w-28 h-14 self-center object-contain cursor-pointer " />
        <NavLinks />
      </div>


      <div className="absolute md:hidden block top-6 right-3" >
        {
          mobileMenuOpen
            ?
            <RiCloseLine onClick={() => setMobileMenuOpen(false)} className="w-6 h-6 text-white mr-2 cursor-pointer" />
            :
            <HiOutlineMenu onClick={() => setMobileMenuOpen(true)} className="w-6 h-6 text-white mr-2 cursor-pointer " />
        }
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'} `} >         {/* bg-gradient-to-topLength */}
        <img src={logo} alt="logo" className="w-28 h-14 self-center object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>


    </>
  )
};

export default Sidebar;

import "./Header.css"
import { useState } from "react"
import { IoReorderThree } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { FaShopify } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [isIcon,setIsIcon]=useState(true)
  const [iconStyle,setIconStyle]=useState({top:"7%"})
  function toggleMenu(){
      if(isIcon){
        setIsIcon(false)
        setIconStyle({top:"-100%"})
      }else{
        setIsIcon(true)
        setIconStyle({top:"7%"}) 
      }
  }
  return (
   
    <nav className="bg-gray-700 text-white flex justify-between items-center w-full mx-auto py-1 nav-top-shadow">
         <div className="md:m-3 m-1">
         <FaShopify className="text-3xl"/>
         </div>
         <div style={iconStyle} className="md:static md:min-h-fit absolute bg-gray-700 min-h-[50vh] left-0 md:w-auto w-full top-[-100%] flex items-center px-5 md:my-2 sm:m-0" >
            <ul className="flex flex-col md:flex-row md:items-center md:gap-[4vw] gap-8 ">
              <li>
                <a className="hover:text-gray-300" href="#" >
                Products
                </a>
              </li>
              <li>
                <a className="hover:text-gray-300" href="#" >
                Service
                </a>
              </li>
              <li>
                <a className="hover:text-gray-300 " href="#" >
                Abouts
                </a>
              </li>
              <li>
                <a className="hover:text-gray-300" href="#" >
                Service
                </a>
              </li>
              <li>
                <a className="hover:text-gray-400" href="#" >
                Latest
                </a>
              </li>
            </ul>
         </div>
         <div className="flex items-center gap-4 ">
            <button className="bg-[#97b3e4] md:mr-2 text-white px-5 py-2 rounded-full hover:bg-[#81a7e9] border-solid border-2 border-indigo-100 hover:border-indigo-300">Sign In </button>
            <div className="text-3xl cursor-pointer md:hidden">
                {!isIcon ? <IoReorderThree onClick={toggleMenu} /> 
                    :<FaXmark onClick={toggleMenu}/> }
            </div>
         </div>
    </nav>
  )
}

export default Header
import "./Header.css"
import { useState,useRef } from "react"
import { IoReorderThree } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { FaShopify } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [isIcon,setIsIcon]=useState(true)
  const [iconStyle,setIconStyle]=useState({top:"7%"})
  const ref_width=useRef()
  function toggleMenu(){
      if(isIcon){
        setIsIcon(false)
        setIconStyle({top:"-100%"})
      }else{
        setIsIcon(true)
        if(ref_width.current.clientWidth>400){
          setIconStyle({top:"6%"}) 
        }else{
          setIconStyle({top:"8%"}) 
        }
       
      }
  }
  return (
   
    <nav className=" bg-green-600 text-white flex justify-between items-center w-full mx-auto py-1 nav-top-shadow z-1000">
         <div className="md:m-3 m-1 flex flex-row items-center">
         <FaShopify className="text-3xl"/>
         <h1 className="ml-2">F&V</h1>
         </div>
         <div ref={ref_width} style={iconStyle} className="md:static md:min-h-fit absolute bg-green-600 min-h-[50vh] left-0 md:w-auto w-full top-[-100%] flex items-center px-5 md:my-2 sm:m-0 z-50" >
            <ul className="flex flex-col md:flex-row md:items-center md:gap-[4vw] gap-8 ">
              <li>
                <a className="hover:text-gray-200" href="#" >
                Products
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#" >
                Service
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200 " href="#" >
                Abouts
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#" >
                Service
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#" >
                Latest
                </a>
              </li>
            </ul>
         </div>
         <div className="flex items-center gap-4 ">
            <button className="bg-white md:mr-2 text-green-600 px-5 py-2 rounded-full hover:bg-green-200 border-solid border-2 border-green-100 hover:border-green-300">Sign In </button>
            <div className="text-3xl cursor-pointer md:hidden">
                {!isIcon ? <IoReorderThree onClick={toggleMenu} /> 
                    :<FaXmark onClick={toggleMenu}/> }
            </div>
         </div>
    </nav>
  )
}

export default Header
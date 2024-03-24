import "./Header.css"

const Header = () => {
  return (
    <div className=" w-full mx-auto flex flex-wrap m-0 p-0 flex-col md:flex-row items-center bg-black-400">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRofrTrAUzEpMZjfQUpLrOPHShYc5mZ4R9VTA&usqp=CAU" width="50px" height="50px" />
        </a>
        <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5">First Link</a>
            <a className="mr-5">Second Link</a>
            <a className="mr-5">Third Link</a>
            <a className="mr-5">Fourth Link</a>
        </div>
        <div className='flex flex-row items-center mx-2 '> 
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&s' className='user-bg-image' width="40px" height="40px" alt="user" />
            <button className="inline-flex items-center bg-blue-500 ml-2 rounded-lg border-0 py-2 px-3 mt-4 md:mt-0 text-white">Click Me</button>
        </div>
    </div>
  )
}

export default Header
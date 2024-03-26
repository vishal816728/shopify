
import spinach from "../../Asset/images/vegetables/spinach.png";
import "./card.css";
const FruitCard = () => {
  return (
    <div className='relative sm:w-[220px] md:w-[200px] h-[270px] border-solid border-[1px] border-gray-300 cursor-pointer m-2 flex flex-col card'>
              <img src={spinach} alt="..." className='h-[60%]' />
              <div className= 'h-[40%] flex flex-row'>
                   <div className='overflow-hidden'>
                       <h1 className='m-1 text-gray-700'>Palak</h1>
                       <p className='text-[12px] text-gray-500 ml-1'>&#8377;40/Kg</p>
                       <h1 className='font-bold text-[15px]'>&#8377;10</h1>
                       <p className='text-[12px] text-gray-500'>250g</p>
                   </div>
                  <p className="absolute px-7 py-[1px] border-solid border-[1px] bg-red-400 text-white">&#8377;5 OFF</p> 
                  <button className='absolute px-5 py-[2px] border-solid border-[1px] border-green-600 hover:border-green-700 rounded-lg bottom-2 right-2 text-green-700'>ADD</button>
              </div>    
          </div>
  )
}

export default FruitCard
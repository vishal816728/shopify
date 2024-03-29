import FruitCard from '../Components/Card/FruitCard.jsx'
import CustomCarousel from '../Components/Carousel/Carousel.jsx'
import Layout from '../Components/Layout/Layout.jsx'

const Home = () => {
  const arr=[1,2,4,5,6,7,8,9,10]
  return (
        <Layout>
          <CustomCarousel />
          <h1 className='text-2xl font-semibold text-start p-2'>Vegetables&nbsp;:&nbsp;<span className='font-normal'>Fresh Deals</span></h1>
          <div className='border-solid border-2 border-red-400 flex flex-wrap md:justify-between place-content-center w-full'>
          {
            arr.map((item,index)=><FruitCard key={index}/>)
          }
          </div>
          <h1 className='text-start p-2 text-2xl font-semibold'>Fruits</h1>
          <div className='border-solid border-2 border-red-400 flex flex-wrap justify-center'>
          {
            arr.map((item,index)=><FruitCard  key={index}/>)
          }
          </div>
        </Layout>
  )
}

export default Home
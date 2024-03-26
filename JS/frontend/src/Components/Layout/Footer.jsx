const Footer = () => {
  const year=new Date().getFullYear()
  return (
    <div className="flex flex-col items-center justify-around bg-green-600 py-2 text-white w-auto">
       <div>
          Shopify Pvt Ltd - India 
       </div>
       <div>
          &copy;{year}
       </div>
    </div>
  )
}

export default Footer
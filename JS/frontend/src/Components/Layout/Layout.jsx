import Header from './Header'
import Footer from './Footer'

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
  return (
    <div>
        <Header />
        <main  className='md:min-h-[80.3vh] min-h-[82.5vh]'>
        {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout
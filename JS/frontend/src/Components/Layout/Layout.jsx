import Header from './Header'
import Footer from './Footer'

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
  return (
    <div>
        <Header />
        <main style={{minHeight:"75vh"}}>
        {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout


import React from 'react'
import Header from '../../comA/Header'
import Footer from '../../comA/Footer'
import Carousel from '../layout/Caruosel'
import BlogScrollSection from '../layout/BlogSrcollSection'
import ResidenceSection from '../layout/ResidenceSection'







// import Banner from './Banner'


const Layout = ({Children}) => {
    return (
      <div className="min-h-screen flex flex-col">
          <Header />
  {/* <Banner /> */}
  <Carousel />
  <ResidenceSection  />
<BlogScrollSection />

   {Children}
 
          <Footer />
      </div>

  )
}

export default Layout
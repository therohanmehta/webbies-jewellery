import Hero from '@/Component/Jewelry/Hero'
import LikeProd from '@/Component/Jewelry/Like'
import Product from '@/Component/Jewelry/OurProduct'
import Product2 from '@/Component/Jewelry/OurProduct2'
import OurProductTitle from '@/Component/Jewelry/OurProductTitle'
import Shop from '@/Component/Jewelry/Shop'
import React from 'react'

function Jewelry() {
  return (
    <div className='bg-black'>

      <Hero/>
      <OurProductTitle/>
      {/* <Product/> */}
      <Product2/>
      <Shop/>
      <LikeProd/>
  
    </div>
  )
}

export default Jewelry

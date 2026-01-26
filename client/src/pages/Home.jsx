import React from 'react'
import BannerProduct from '../component/BannerProduct'
import VerticalCard from '../component/VerticalCard'
import NewsLetter from '../component/NewsLetter'
import CategoryMyPage from '../component/CategoryMyPage'
import SaleItem from '../component/SaleItem'

function Home() {
  return (
    <div className=' w-full h-full'>
        <BannerProduct/>
        <CategoryMyPage/>
        <SaleItem heading={"Sale Items"}/>
        <VerticalCard category={"kurti"} heading={"Top Kurti Collection"}/>
        <VerticalCard category={"sweatshirts"} heading={"T-shirts Collection"}/>
        <NewsLetter/>
    </div>
  )
}

export default Home
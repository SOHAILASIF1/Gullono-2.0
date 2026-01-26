import React from 'react'
import { FaTags } from "react-icons/fa"

function SaleBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-white py-3 px-4 md:px-8 flex items-center justify-center shadow-md animate-pulse z-50">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 max-w-screen-lg">
        <FaTags className="text-xl sm:text-2xl md:text-3xl" />
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center tracking-wide">
          🎉 <span className="hidden sm:inline">Summer & Eid Sale:</span> <span className="underline underline-offset-4">Up to 60% Off</span> on Selected Items – <span className="hidden sm:inline">Shop Now!</span>
        </p>
      </div>
    </div>
  )
}

export default SaleBanner

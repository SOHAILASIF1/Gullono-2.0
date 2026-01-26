import React, { useEffect, useState } from "react";

import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image1M from "../assest/banner/img1_mobile.jpg";
import image2M from "../assest/banner/img2_mobile.webp";
import image3M from "../assest/banner/img3_mobile.jpg";
import image4M from "../assest/banner/img4_mobile.jpg";
import image5M from "../assest/banner/img5_mobile.png";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";



function BannerProduct() {
  const [current, setCurrent] = useState(0);

  const nextImage= ()=>{
    if (desktopImage.length -1 > current) {
        setCurrent(prev=>prev+1)
    }
    
}
  const mobileImage=[
    image1M,image2M,image3M,image4M,image5M
  ]
  const desktopImage = [ image2, image3, image4, image5];

  useEffect(()=>{
    const interval=setInterval(()=>{
      if (desktopImage.length -1 > current) {
        nextImage()
        
      }else{
        setCurrent(0)
      }
    },4000)
  
    return ()=>clearInterval(interval)
  
  },[current])
  return (
    <div className=" rounded ">
      <div className="lg:h-102 h-86 w-full bg-slate-100 relative overflow-hidden ">
        <div className="absolute z-10 h-full w-full flex items-center">
          <div className=" hidden   lg:flex justify-between w-full">
            <button onClick={()=>{
                if (current!= 0) {
                    setCurrent(prev=>prev-1)
                }
                
            }} className="p-1 bg-red-300 rounded-full"><FaChevronLeft/></button>
            <button onClick={nextImage} className="p-2 rounded-full bg-red-300 "><FaChevronRight/></button>
          </div>
        </div>

        <div className="hidden lg:flex h-full w-full">
          {desktopImage.map((imageUrl, index) => {
            return (
              <div
                className="transition-all  h-full w-full min-w-full min-h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
                key={index}
              >
                <img src={imageUrl} alt="" className="h-full object-cover w-full" />
              </div>
            );
          })} 
        </div>
        <div className="flex h-full w-full lg:hidden">
          {mobileImage.map((imageUrl, index) => {
            return (
              <div
                className="transition-all  h-full w-full min-w-full min-h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
                key={index}
              >
                <img src={imageUrl} alt="" className="h-full object-fill w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BannerProduct;

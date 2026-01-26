import React, { useEffect, useState }  from 'react'
import {useLocation} from 'react-router-dom'
import SummaryApi from '../commen'
import SearchProduct from '../component/SearchProduct'

function Search() {
    const query=useLocation()
    const [data,setData]=useState([])
    const fetchData=async()=>{
      const dataRes=await fetch(SummaryApi.search.url+query.search)
      const res=await dataRes.json()
      if (res.success) {
        setData(res?.data)
        
      }
    }
    useEffect(()=>{
      fetchData()
    },[query])
   
  return (
    <div className='p-4 h-full w-full'>
      {
        data.length !== 0 && (
          <>
          <p className='text-center w-full text-2xl font-bold'>{data.length}</p>
          <SearchProduct data={data}/>
          </>

        )
      }
     
      {
        data.length ===0 && (
          <p className='w-full text-center font-bold'>No Data Found</p>
        )
      }
      {

      }



    
    </div>
  )
}

export default Search
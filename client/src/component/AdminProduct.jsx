import React, { useState } from 'react'

import { CiEdit } from "react-icons/ci";
import SummaryApi from '../commen';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import EditProduct from './EditProduct';



function AdminProduct({
    data,
    fetchData
    
}) {
    const [edit,setEdit]=useState(false)
    const handleDelete=async()=>{
        const deleteProduct=await fetch(SummaryApi.deleteProduct.url(data?._id), {
            method: SummaryApi.deleteProduct.method,
            credentials: 'include',
    })
    const responce=await deleteProduct.json()
    if (responce.success) {
       toast.success(responce.message || "Product Deleted Successfully")
       fetchData()
       
    }else{
        toast.error(responce.message || "Failed to delete product")
    }}
  return (
    <div className='bg-amber-65 border px-2 rounded-lg py-2 outline-0  shadow-bottom-right bg-gray-100  border-gray-100 '>
        <div className="w-40">
            <div className="flex justify-center items-center w-full h-28">
                <img src={data?.productImage[0]} className='object-scale-down h-full mx-auto' alt="" />

            </div>
            <h1 className='line-clamp-2 text-ellipsis truncate text-center text-2xl font-bold '>{data?.productName}</h1>
            <p>{data?.sellingPrice}</p>
           <div className='flex justify-end items-center gap-1'>
           <div className='rounded-full  p-1  bg-green-400 text-white' onClick={()=>{
                setEdit(true)
            }}>
                <CiEdit/>

            </div>
            <div className='rounded-full   p-1 bg-green-400 text-white' onClick={handleDelete}
            >
                <MdDelete/>

            </div>
           </div>
        </div>
        {
            edit && <EditProduct productData={data} fetchData={fetchData} onClose={()=>setEdit(false)} />
        }

    </div>
  )
}

export default AdminProduct
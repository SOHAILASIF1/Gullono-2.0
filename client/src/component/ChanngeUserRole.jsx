import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import Role from '../commen/role';
import SummaryApi from '../commen';
import { toast } from 'react-toastify';


function ChanngeUserRole(
    {
        fullName,
        email,
        role,
        userId,
        onClose,
        callFunction
    }
) {
    const [userRole,setUserRole]=useState(role)
    const updateUser=async()=>{
        try {
            const updateUser=await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    role: userRole
                })})
              
                const response = await updateUser.json();
                if (response.success) {
                    toast.success("User Role Updated Successfully")
                    onClose()
                    callFunction()
                    
                }else{
                    toast.error(response.message || "Failed to update user role")
                }

            
        } catch (error) {
            console.log(error.message);
            
        }
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center '>
        <div className='mx-auto bg-yellow-50 rounded-sm p-4 w-full max-w-sm'>
            <button onClick={onClose} className=" block ml-auto"><IoIosClose/></button>
            <h4 className=' font-semibold'>Change User Role</h4>
            <p>name: {fullName}</p>
            <p>email: {email}</p>
           <div className='mt-2 flex justify-between items-center'>
            <p>Role</p>
            <select name="" value={userRole} onChange={(e)=>setUserRole(e.target.value)} id="">
                {
                    Object.values(Role).map((role, index) => {
                        return (
                            <option key={index} value={role}>{role}</option>
                        )
                    })
                }
                
                </select> 
                

           </div>
           <button onClick={updateUser} className='px-4 py-2 rounded-lg bg-amber-600 text-white'> Update User</button>



        </div>
        
    </div>
  )
}

export default ChanngeUserRole
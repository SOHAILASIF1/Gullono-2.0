import React, { useEffect, useState } from 'react'
import SummaryApi from '../commen'
import { toast } from 'react-toastify'
import ChanngeUserRole from '../component/ChanngeUserRole'

function AllUser() {
  const [allUser, setAllUser] = useState([])
  const [updateUser,setUpdateUser] = useState({
    name:'',
    email:'',
    role:'',
    _id:''
  })
  const [showChangeRole, setShowChangeRole] = useState(false)

  const fetchAllUser = async () => {
    
      const fetchusers = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include"
      })
      const response = await fetchusers.json()
      if (response.success && !response.error) {
        setAllUser(response.data)
      }
      if (response.error) {
        toast.error(response.message)
      }
    
  }

  useEffect(() => {
    fetchAllUser()
  }, [])

  return (
    <div className=" p-6 rounded-lg  overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <table className="min-w-full border shadow-xl border-gray-200">
        <thead>
          <tr className="">
            <th className="py-2 px-4 border-b text-left">SR No</th>
            <th className="py-2 px-4 border-b text-left">Full Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">User Role</th>
            <th className="py-2 px-4 border-b text-left">Edit</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map((user, index) => (
            <tr
              key={user?._id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{user?.fullName}</td>
              <td className="py-2 px-4 border-b">{user?.email}</td>
              <td className="py-2 px-4 border-b capitalize">{user?.role}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={()=>{
                  setUpdateUser(user)

                  setShowChangeRole(true)
                }} className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          ))}
          {allUser?.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 text-gray-500"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showChangeRole && (
        <ChanngeUserRole 
          fullName={updateUser?.fullName}
          email={updateUser?.email}
          role={updateUser?.role}
          userId={updateUser?._id}
          onClose={() => {
            setShowChangeRole(false)
            
          }}
          callFunction={fetchAllUser}
        />
      )}
    </div>
  )
}

export default AllUser

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { setUserDetail } from '../redux/userSlice';

function AdminPanel() {
    const user=useSelector(state=>state?.user?.user)
   
  return (
    <div className='min-h-[calc(100vh-120px)] fixed top-0 w-full h-full flex z-50 bg-white'>
      <aside className="bg-white w-full max-w-60">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-4xl cursor-pointer relative flex justify-center">
            <FaRegUserCircle />
          </div>
          <p className="text-lg font-semibold">{user?.fullName}</p>
          <p className="text-black">Product</p>
        </div>
        <div className="grid p-4">
          <Link to={'all-user'} className="px-2 py-1 hover:bg-slate-100">All User</Link>
          <Link to={'all-order'} className="px-2 py-1 hover:bg-slate-100">All Order</Link>



          <Link to={'all-product'} className="px-2 py-1 hover:bg-slate-100">Products</Link>
          <Link to={'completed-order'} className="px-2 py-1 hover:bg-slate-100">Completed Order</Link>

        </div>
      </aside>
      <main className='h-full w-full  bg-cyan-100'>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;

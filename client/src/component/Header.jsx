import React, { useContext, useEffect, useState, useRef } from 'react';
import { TbShoppingCart } from 'react-icons/tb';
import { FaUserAlt } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../commen';
import { setUserDetail } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { Context } from '../App';
// import logo from '../assest/logo.png'
function Header() {
  const context = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialLocation = useRef(null);
  const [hasTyped, setHasTyped] = useState(false);
  const [search, setSearch] = useState(
    new URLSearchParams(location.search).get('q') || ''
  );
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    if (initialLocation.current === null) {
      initialLocation.current = location;
    }
  }, [location]);

  const { countItem } = context;
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    const res = await fetch(SummaryApi.logout.url, {
      method: SummaryApi.logout.method,
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      dispatch(setUserDetail(data.data));       // null ya {} set hoga
      context.setCountItem(0);  
      context.countItem()                // UI se cart count hata do
      toast.success(data.message);
  
      setTimeout(() => {
        window.location.reload();               // ✅ page full reload
      }, 500);
    }
  };
  

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  
    if (value.trim()) {
      setHasTyped(true);
      navigate(`/search?q=${encodeURIComponent(value)}`);
    } else {
      navigate('/'); // redirect to home when input is cleared
      setHasTyped(false);
    }
  };
  
  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  useEffect(() => {
    if (!user?._id) setMenu(false);
  }, [user?._id]);

  return (
    <div className="w-full shadow bg-white sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between px-4 py-2 md:py-3 md:px-10">
        {/* Left */}
        <div>
          <div className="text-lg md:text-xl font-bold text-amber-600">
          <h6>Sohail</h6>
          </div>
        </div>

        {/* Middle */}
        <div className="flex-1 flex justify-center px-2">
          <div className="w-full max-w-sm relative">
            {/* Desktop Input */}
            <input
              type="text"
              placeholder="Search Products"
              value={search}
              onChange={handleSearch}
              className="hidden md:block w-full px-4 py-1.5 rounded-lg bg-gray-200 outline-none text-sm"
            />
            {/* Mobile Search Toggle */}
            <button
              className="md:hidden p-2  bg-gray-100 rounded-md text-amber-600"
              onClick={toggleMobileSearch}
            >
              <BiSearch size={20} />
            </button>

            {/* Mobile Input (overlay or dropdown) */}
            {showMobileSearch && (
  <div className="fixed inset-0 bg-white z-[1000] flex items-start px-4 py-3 shadow-lg">
    <input
      type="text"
      placeholder="Search Products"
      value={search}
      onChange={handleSearch}
      className="flex-1 px-4 py-2 rounded-md bg-gray-200 text-sm outline-none"
      autoFocus
    />
    <button
      onClick={toggleMobileSearch}
      className="ml-3 text-amber-600 font-semibold text-sm"
    >
      Cancel
    </button>
  </div>
)}

          </div>
        </div>

        {/* Right – Cart, Admin, Login/Logout */}
        <div className="flex items-center gap-4 text-gray-800 mt-2 md:mt-0">
          <Link to="/cart" className="relative flex items-center gap-1 hover:text-amber-600">
            <TbShoppingCart className="text-2xl" />
            {Number(countItem) > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {countItem}
              </span>
            )}
            <p className="hidden md:block text-sm font-medium">Cart</p>
          </Link>

          {user?.role === 'ADMIN' && (
            <div className="relative cursor-pointer overflow-visible" onClick={() => setMenu(!menu)}>
              <div className="flex items-center gap-2 hover:text-amber-600">
                <FaUserAlt />
                <p className="text-sm font-medium hidden md:block">Admin</p>
              </div>
              {menu && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md z-[9999] w-48">
                  <ul onClick={() => setMenu(false)} className="flex flex-col">
                    <li>
                      <Link to="/admin-panel/all-product" className="block px-4 py-2 hover:bg-amber-100 text-sm text-gray-700">
                        Admin Panel
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {user?._id ? (
            <button onClick={handleLogout} className="bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-lg">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-lg">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
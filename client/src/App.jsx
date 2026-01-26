import React, { useEffect ,createContext } from 'react'
import './App.css'
import SaleBanner from './component/SaleBanner'
import Header from './component/Header'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Links from './component/Links'
import Sign from './pages/Sign'
import { ToastContainer, toast  } from 'react-toastify';
import Login from './pages/Login'
import SummaryApi from './commen'
import { useDispatch } from 'react-redux'
import { setUserDetail } from './redux/userSlice'
import AdminPanel from './pages/AdminPanel'
import AllUser from './pages/AllUser'
import AllProduct from './pages/AllProduct'
import Footer from './component/Footer'
import ProductDetail from './pages/ProductDetail'
import ProductCategory from './component/ProductCategory'
import { useState } from 'react'
import Cart from './pages/Cart'
import Search from './pages/Search'
import Order from './pages/OrderPage'
import AllOrder from './pages/AllOrder'
import OrderConfirmation from './pages/OrderConfirmation'
import ContactUs from './pages/ContactUs'
import CompletedOrder from './pages/CompletedOrder'

const Context = createContext(null) || {};

function App() {
  const [countItem,setCountItem]=useState('')

  const dispatch=useDispatch()

  const fetchUser = async () => {
    const fetchData = await fetch(SummaryApi.userDetail.url, {
      method: SummaryApi.userDetail.method,
      credentials: 'include'
    });
  
    if (fetchData.status === 401 || fetchData.status === 400) {
      dispatch(setUserDetail(null));
      return;
    }
  
    const resData = await fetchData.json();
    if (resData.success) {
      dispatch(setUserDetail(resData.data));
    } else {
      dispatch(setUserDetail(null));
    }
  };

  const fetchCount=async()=>{
    
      const dataRes=await fetch(SummaryApi.countCart.url,{
        method:SummaryApi.countCart.method,
        credentials:"include"
      })
      const dataApi=await dataRes.json()
      if (dataApi.success) {
        setCountItem(dataApi?.data?.count)
        
      }
      
  
  }
  
  
  useEffect(()=>{
    fetchUser()
    fetchCount()
  },[])
  return (
    <div className='  bg-gradient-to-br from-gray-100 to-gray-300'>
    <Context.Provider value={{fetchUser,countItem,fetchCount}}>
    <BrowserRouter>
    <ToastContainer
          toastStyle={{
            backgroundColor: 'black',
            color: 'white',
          }}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}
        position="bottom-center"
        />
    
        
        
       <SaleBanner />
       <Header/>
       <Links/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<Sign/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin-panel' element={<AdminPanel/>}> 
        <Route path='all-user' element={<AllUser/>}/>
        <Route path='all-product' element={<AllProduct/>}/>
        <Route path='all-order' element={<AllOrder/>}/>
       < Route path='completed-order' element={<CompletedOrder/>}/>



        </Route>
        <Route path='/order' element={<Order/>}/>
        <Route path="/search" element={<Search/>} />
        <Route
          path='/category-product/:categoryName'
          element={<ProductCategory/>}
        />
        <Route path='/orderConfirmation' element={<OrderConfirmation/>}/>
        <Route path='/product-detail/:id' element={<ProductDetail/>}/>
        <Route  path='/cart' element={<Cart/>}/>
        <Route path='/contactUs' element={<ContactUs/>}/>

       </Routes>

       <Footer/>
       
       </BrowserRouter>
       </Context.Provider>


     
    </div>
  )
}

export default App
export { Context };
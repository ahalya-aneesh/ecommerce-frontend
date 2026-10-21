import ProductList from './components/ProductList'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProductDetails from './components/ProductDetails'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import UpdateProduct from './components/UpdateProduct'
import Register from './pages/register'
import Login from './pages/login'
import Cart from './pages/cart';
import Checkout from './pages/Checkout';
import Wishlist from "./pages/wishlist";
import ProductCatalog from './pages/ProductCatalog'
import { getProfile } from './redux/userSlice'

function App() {
  const dispatch = useDispatch()
  const { user, authChecking } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const renderAdminPage = (page) => {
    if (authChecking) {
      return <p className="p-8 text-center" role="status">Checking account...</p>
    }

    return user?.role === 'admin' ? page : <Navigate to="/" replace />
  }

  return (
    <div>
      <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
    <Route path='/products' element={<ProductCatalog/>}/>
    <Route path='/admin/dashboard' element={renderAdminPage(<ProductList/>)} />
    <Route path='/product/:id' element={<ProductDetails/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/checkout' element={<Checkout/>}/>
    <Route path='/checkout/success/:orderId' element={<Checkout/>}/>
    <Route path='/updateproduct' element={renderAdminPage(<UpdateProduct/>)} />
    <Route path="/wishlist" element={<Wishlist />} />
   </Routes>
      
    </div>
  )
}

export default App

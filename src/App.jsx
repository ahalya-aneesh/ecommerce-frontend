import ProductList from './components/ProductList'
import { Route, Routes } from 'react-router-dom'
import ProductDetails from './components/ProductDetails'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import UpdateProduct from './components/UpdateProduct'
import Register from './pages/register'
import Login from './pages/login'
import Cart from './pages/cart';
import Wishlist from "./pages/wishlist";
function App() {
  return (
    <div>
      <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
    <Route path='/products' element={<ProductList/>}/>
    <Route path='/product/:id' element={<ProductDetails/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/updateproduct' element={<UpdateProduct/>}/>
    <Route path="/wishlist" element={<Wishlist />} />
   </Routes>
      
    </div>
  )
}

export default App

import Header from './views/header';
import Home from "./views/home";
import Cart from "./views/cart.jsx";
import Shop from "./views/shop.jsx";
import Contact from "./views/contact_us.jsx";
import Footer from './views/footer.jsx';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import PrivateRoute from './views/PrivateRoute.jsx';
import ProductDetail from './views/product_detail.jsx';
import { LoginProvider } from './required_context/LoginContext.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './views/PageNotFound.jsx';
import Order from './views/order.jsx';
import Products from './views/AdminProducts.jsx';
import AdminDashboard from './views/AdminDashboard.jsx';
import AddProduct from './views/AddProduct.jsx';
import MyOrders from './views/MyOrders.jsx';
import AdminOrders from './views/AdminOrders.jsx';
function App() {
  return (
    <>
      <LoginProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product-details" element={<ProductDetail />} />
            {/* Private routes */}
            <Route element={<PrivateRoute />}>
              {/* <Route path="/cart" element={<Cart  />} /> */}
              <Route path='/purchase' element={<Order />} />
              <Route path='/my-orders' element={<MyOrders />} />
              <Route path='/admin' element={<AdminDashboard/>}/>
              <Route path='/admin/add-product' element={<AddProduct/>} />
              <Route path= '/admin/orders' element={<AdminOrders/>}/>
              <Route path='/admin/products' element={<Products/>}/>
            </Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </Router>
        <Footer />
      </LoginProvider>

    </>
  );
}

export default App;

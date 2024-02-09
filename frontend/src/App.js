import React from 'react';
import "./bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';

import Homescreen from './screens/Homescreen';
import CartScreen from './screens/CartScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginscreen from './screens/LoginScreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import Shippingscreen from './screens/Shippingscreen';
import Paymentscreen from './screens/Paymentscreen';
import Placeorderscreen from './screens/Placeorderscreen';
import Orderscreen from './screens/Orderscreen';
import OrderListscreen from './screens/OrderListscreen';
import ProductScreenMen from "./screens/ProductScreenMen";
import ProductListMen from "./screens/ProductListMen";
import ProductListWomen from "./screens/ProductListWomen";
import ProductScreenWomen from "./screens/ProductScreenWomen";
import SearchScreen from "./screens/SearchScreen";
import AboutScreen from "./screens/AboutScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import MenProductListScreen from "./screens/MenProductListScreen";
import WomenProductListScreen from "./screens/WomenProductListScreen";
import MenProductEditScreen from "./screens/MenProductEditScreen";
import WomenProductEditScreen from "./screens/WomenProductEditScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import AdminContactScreen from "./screens/AdminContactScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className='py-3'>
          <Routes>
            <Route path='/login' element={<Loginscreen />} />
            <Route path='/register' element={<Registerscreen />} />
            <Route path='/profile' element={<Profilescreen />} />
            <Route path='/' element={<Homescreen />} exact />
            <Route path='/shipping' element={<Shippingscreen />} />
            <Route path='/payment' element={<Paymentscreen />} />
            <Route path='/placeorder' element={<Placeorderscreen />} />
            <Route path='/orders/:id' element={<Orderscreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/contact' element={<ContactUsScreen/>}/>
            <Route path='/admin/contacts' element={<AdminContactScreen/>} />
            <Route path='/search/:keyword' element={<SearchScreen />} exact/>
            <Route path='/about' element={<AboutScreen/>} exact />
            
            
            <Route path='/menproduct/:id' element={<ProductScreenMen/>} />
            <Route path='/menswear/:category/menproduct/:id' element={<ProductScreenMen/>} />
            <Route path='/search/:category/menproduct/:id' element={<ProductScreenMen/>} />
            <Route path='/womenproduct/:id' element={<ProductScreenWomen/>} />
            <Route path='/womenswear/:category/womenproduct/:id' element={<ProductScreenWomen/>} />
            <Route path='/search/:category/womenproduct/:id' element={<ProductScreenMen/>} />
            <Route path='/menswear/:category' element={<ProductListMen/>} exact />
            <Route path='/womenswear/:category' element={<ProductListWomen/>} exact />

            <Route path='/admin/userlist' element={<UserListScreen/>} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
            <Route path='/admin/menproductslist' element={<MenProductListScreen/>} />
            <Route path='/admin/womenproductslist' element={<WomenProductListScreen/>} />
            <Route path='/admin/mensproduct/:category/:id/edit' element={<MenProductEditScreen/>} />
            <Route path='/admin/womensproduct/:category/:id/edit' element={<WomenProductEditScreen/>} />
            
            <Route path='/admin/orderlist' element={<OrderListscreen />} />

          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

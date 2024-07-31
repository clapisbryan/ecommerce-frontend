import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserProvider } from './hooks/UserContext';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import NoMatch from './pages/NoMatch/NoMatch';
import Products from './pages/Products/Products';
import ProductView from './pages/Products/ProductView';
import Register from './pages/Register/Register';
import OrderHistory from './pages/Order/OrderHistory';
import Profile from './pages/Profile/Profile';
import OrderHistoryAdmin from './pages/Order/OrderHistoryAdmin';
import { retrieveUserDetails } from './services/apiServices';

const App = () => {

  const token = localStorage.getItem('token');

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    localStorage.clear();
  };

  useEffect(() => {

    getUserDetails();

    fetch(`https://ecommerce-backend-7aob.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data !== undefined) {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });
        } else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      })
  }, [token])


  const getUserDetails = async () => {
    const userData = await retrieveUserDetails();
    console.log("userData", userData);
  }

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductView />} />
            {user.id ?
              <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart-view" element={<Cart />} />
                {user.isAdmin ?
                  <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/all-orders" element={<OrderHistoryAdmin />} />
                  </>
                  :
                  <Route path="/orders" element={<OrderHistory />} />
                }
                <Route path="/logout" element={<Logout />} />
              </>
              :
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            }
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import ProductItem from './pages/products/ProductItem';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Shipping from './pages/shipping/Shipping';
import Payment from './pages/payment/Payment';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Order from './pages/order/Order';
import Contact from './pages/contact/Contact';

const App = () => {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/product/:id' element={<ProductItem />} />
					<Route path='/cart/:id?' element={<Cart />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/login/shipping' element={<Shipping />} />
					<Route path='/payment' element={<Payment />} />
					<Route path='/placeorder' element={<PlaceOrder />} />
					<Route path='/order/:id' element={<Order />} />
					<Route path='/contact' element={<Contact />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;

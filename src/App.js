import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import Cart from "./pages/Cart";
import CartRoute from "./auth/CartRoute";
import PrivateRoute from "./auth/PrivateRoutes";
import AdminRoute from "./auth/AdminRoutes";
import UserDashBoard from "./user/UserDashBoard";
import { Switch, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AddRestaurant from "./admin/AddRestaurant";
import AddDish from "./admin/AddDish";
import ManageDish from "./admin/ManageDish";
import UpdateDish from "./admin/UpdateDish";
import ManageRestaurant from "./admin/ManageRestaurant";

function App() {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/explore" exact component={Explore} />
				<CartRoute path="/cart" exact component={Cart} />
				<PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
				<AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
				<AdminRoute
					path="/admin/create/category"
					exact
					component={AddRestaurant}
				/>
				<AdminRoute
					path="/admin/categories"
					exact
					component={ManageRestaurant}
				/>
				<AdminRoute path="/admin/create/product" exact component={AddDish} />
				<AdminRoute path="/admin/products" exact component={ManageDish} />
				<AdminRoute
					path="/admin/product/update/:productId"
					exact
					component={UpdateDish}
				/>
			</Switch>
		</div>
	);
}

export default App;

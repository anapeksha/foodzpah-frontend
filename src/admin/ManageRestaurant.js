import { useState, useEffect } from "react";
import {
	getCategories,
	deleteCategory,
	getProducts,
	deleteProduct,
} from "./helper/adminapicall";
import { Typography, Grid, Box, IconButton, Button } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Cards from "../components/RestaurantCards";
import { isAuthenticated } from "../auth";
import { useHistory } from "react-router-dom";

function ManageRestaurant() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const { user, token } = isAuthenticated();
	const history = useHistory();

	const loadCategories = () => {
		getCategories().then((data) => {
			if (data !== undefined) {
				setCategories(data);
				console.log(categories);
			}
		});
	};
	const loadProducts = () => {
		getProducts().then((data) => {
			if (data !== undefined) {
				setProducts(data);
				console.log(products);
			} else {
				console.log("Error");
			}
		});
	};
	const deleteThisProduct = (productId) => {
		deleteProduct(productId, user._id, token).then((data) => {
			if (data !== undefined) {
				loadProducts();
			} else {
				console.log("Error");
			}
		});
	};
	useEffect(() => {
		loadCategories();
		loadProducts();
	}, []);

	const deleteThisCategory = (categoryId) => {
		deleteCategory(categoryId, user._id, token).then((data) => {
			if (data !== undefined) {
				loadCategories();
			} else {
				console.log("Error");
			}
		});
	};

	const handleDelete = (categoryId, products) => {
		if (products !== undefined) {
			products.map((product) => {
				if (product.category._id!==undefined && product.category._id === categoryId) {
					deleteThisProduct(product._id);
					deleteThisCategory(categoryId);
				}
			});
		}
	};

	return (
		<div>
			<Button variant="contained" style={{display: "flex", margin: "0% 2%"}} onClick={()=>history.push("/admin/dashboard")}>Back to Dashboard</Button>
			<Typography
				variant="h5"
				component="div"
				alignItems="center"
				justifyContent="center"
				display="flex"
			>
				Manage Restaurants
			</Typography>
			<div className="cart-hr">
				<hr />
			</div>
			<Box
				sx={{
					height: "60vh",
					overflow: "auto",
					boxShadow:
						"rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
					borderRadius: "5px",
					margin: "4vh 10vh",
				}}
			>
				<Grid container spacing={1} className="explore-grid">
					{categories !== undefined &&
						// @ts-ignore
						categories.map((category, index) => {
							return (
								<Grid item xs={12} sm={12} md={12}>
									<Box
										sx={{
											display: "flex",
											maxHeight: "100%",
											maxWidth: "100%",
											boxShadow: "1px 2px 4px #888888",
											borderRadius: "10px",
										}}
									>
										<Box className="delete-button-cart">
											<IconButton
												color="error"
												onClick={() => {
													handleDelete(category._id, products);
												}}
											>
												<DeleteRoundedIcon />
											</IconButton>
										</Box>
										<Box
											sx={{
												display: "flex",
												padding: "10px",
												maxHeight: "100%",
												maxWidth: "20%",
												alignSelf: "flex-start",
											}}
										>
											<Cards key={index} category={category} />
										</Box>
										<Box className="category-details">
											<Typography variant="h3" component="h1">
												{category.name}
											</Typography>

											<Typography variant="subtitle1" component="h5">
												{category.location}
											</Typography>
											<Box className="update-button-category">
												<Button
													style={{ borderRadius: "2px" }}
													variant="contained"
													color="secondary"
													onClick={() => {
														history.push(
															`/admin/category/update/${category._id}`,
														);
													}}
												>
													Update
												</Button>
											</Box>
										</Box>
									</Box>
								</Grid>
							);
						})}
				</Grid>
			</Box>
		</div>
	);
}
export default ManageRestaurant;

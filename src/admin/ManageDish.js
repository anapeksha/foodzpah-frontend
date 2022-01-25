import { useState, useEffect } from "react";
import CartCards from "../components/CartCards";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { Typography, Grid, Box, IconButton, Button } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Cards from "../components/CartCards";
import { isAuthenticated } from "../auth";
import { useHistory } from "react-router-dom";

function ManageDish() {
	const [products, setProducts] = useState([]);
	const { user, token } = isAuthenticated();
	const history = useHistory();

	const loadProducts = () => {
		getProducts().then((data) => {
			if (data !== undefined) {
				setProducts(data);
			}
		});
	};
	useEffect(() => {
		loadProducts();
	}, []);

	const deleteThisProduct = (productId) => {
		deleteProduct(productId, user._id, token).then((data) => {
			if (data !== undefined) {
				loadProducts();
			} else {
				console.log("Error");
			}
		});
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
				Manage Dishes
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
					{products !== undefined &&
						// @ts-ignore
						products.map((product, index) => {
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
													deleteThisProduct(product._id);
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
											<Cards key={index} product={product} />
										</Box>
										<Box className="product-details">
											<Typography variant="h3" component="h1">
												{product.name}
											</Typography>

											<Typography variant="subtitle1" component="h5">
												{product.category.name}
											</Typography>
											<Button
												style={{ borderRadius: "2px" }}
												variant="contained"
												color="secondary"
												onClick={() => {
													history.push(`/admin/product/update/${product._id}`)
												}}
											>
												Update
											</Button>
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

export default ManageDish;

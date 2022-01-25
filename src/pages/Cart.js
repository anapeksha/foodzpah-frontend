import { Typography, Grid, Box, IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Cards from "../components/CartCards";
import React, { useState } from "react";
import StripeCheckout from "./stripeCheckout";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/reducer/cartReducer";
import QtySelector from "../components/QtySelector";

function Cart() {
	// @ts-ignore
	const products = useSelector((state)=>state.cart.products)
	const [reload, setReload] = useState( false );
	const dispatch = useDispatch();

	const getFinalAmount = () => {
		let amount = 0;
		if (products !== undefined) {
			// @ts-ignore
			products.map((product) => {
				amount = amount + (product.price*product.count);
			});
		}
		return amount;
	};
	
	return (
		<div style={{ height: "100%", overflow: "hidden" }}>
			<div className="cart-header">
				<Typography
					variant="h5"
					component="div"
					alignItems="center"
					justifyContent="center"
					display="flex"
				>
					Cart
				</Typography>
				<div className="cart-hr">
					<hr />
				</div>
			</div>
			<Box
				sx={{
					height: "60vh",
					overflow: "auto",
					boxShadow:"rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
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
													dispatch( removeFromCart( product ) );
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
											<Typography variant="h3" component="h1">{product.name}</Typography>
											
											<Typography variant="subtitle1" component="h5">
												{product.description}
											</Typography>
											<QtySelector productObj={ product}/>
										</Box>
									</Box>
								</Grid>
							);
						})}
				</Grid>
			</Box>
			<Typography
				variant="h6"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				Total Price : &nbsp;₹
				{getFinalAmount()}
			</Typography>
			<div style={{ padding: "1% 5%", position: "sticky" }}>
				<StripeCheckout
					amount={getFinalAmount()}
					products={products}
					setReload={setReload}
				/>
			</div>
		</div>
	);
}

export default Cart;

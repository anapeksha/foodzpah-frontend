import React, { Suspense, lazy } from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getProducts } from "../admin/helper/adminapicall";
import { getProductName } from "../admin/helper/adminapicall";
import SearchBox from "../components/SearchBox";
import Loader from "../components/Loader";

const Cards = lazy(() => import("../components/Cards"));

function Explore() {
	const [reload, setReload] = useState(false);
	const [error, setError] = useState("");
	const [products, setProducts] = useState([]);
	const [productUpdated, setProductUpdated] = useState([]);
	const [value, setValues] = useState("");

	const handleChange = (event) => {
		setValues(event.target.value);
	};

	const loadProduct = () => {
		getProducts().then((data) => {
			if (data === undefined) {
				setError("Error Loading Products");
			} else {
				setProducts(data);
				setProductUpdated(data);
			}
		});
	};

	const updateInput = async (value) => {
		const filtered = products.filter((product) => {
			return product.name.toLowerCase().includes(value.toLowerCase());
		});
		setProductUpdated(filtered);
	};

	useEffect(() => {
		loadProduct();
		console.log(products);
	}, []);

	useEffect(() => {
		updateInput(value);
		console.log(productUpdated);
	}, [value]);

	return (
		<div>
			<div className="explore-header">
				<Typography
					variant="h5"
					component="div"
					alignItems="center"
					justifyContent="center"
					display="flex"
				>
					Explore
				</Typography>
				<div className="explore-hr">
					<hr />
				</div>
			</div>
			<Box className="search-box">
				<SearchBox value={value} setValue={setValues} />
			</Box>
			<Suspense fallback={<Loader />}>
				<Grid container spacing={2} className="explore-grid">
					{productUpdated.map((product, index) => {
						return (
							<Grid item xs={6} sm={4} md={2}>
								<Cards
									key={index}
									product={product}
									removeFromCart={false}
									addtoCart={true}
									setReload={setReload}
									reload={reload}
								/>
							</Grid>
						);
					})}
				</Grid>
			</Suspense>
		</div>
	);
}

export default Explore;

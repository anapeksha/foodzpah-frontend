import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../uri";
import { Button } from "@mui/material";

const StripeCheckout = ({
	products,
	setReload = (f) => f,
	reload = undefined,
	amount = 0,
}) => {
	const [data, setData] = useState({
		loading: false,
		success: false,
		error: "",
		address: "",
	});

	const token = isAuthenticated() && isAuthenticated().token;
	const userId = isAuthenticated() && isAuthenticated().user._id;

	const makePayment = (token) => {
		const body = {
			token,
			products,
		};
		const headers = {
			"Content-Type": "application/json",
		};
		return fetch(`${API}/stripepayment`, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		})
			.then((response) => {
				console.log(response);
				//call further methods
			})
			.catch((error) => console.log(error));
	};

	const showStripeButton = () => {
		return isAuthenticated() ? (
			<StripeCheckoutButton
				stripeKey="pk_test_51JwT4dSH2UYySGFhfqndjuu4wcNqf1qyTjxY4ccPtCJbkSgxaHY2IiNvx45e1NzhXYjtmM1x9UTujhGRlsnACO5500sui3K2Ce"
				token={makePayment}
				amount={amount * 100}
				currency="USD"
				name="Checkout"
				shippingAddress
				billingAddress
			>
				<Button
					variant="outlined"
					size="small"
					style={{ float: "right", color: "white", backgroundColor: "green" }}
				>
					Checkout
				</Button>
			</StripeCheckoutButton>
		) : (
			<Link to="/login">
				<Button
					variant="outlined"
					size="small"
					color="error"
					style={{ float: "right", color: "white", backgroundColor: "green" }}
				>
					Login
				</Button>
			</Link>
		);
	};

	return <div>{showStripeButton()}</div>;
};

export default StripeCheckout;

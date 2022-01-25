import React from "react";
import { Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { createCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth";
import Form from "../components/Form";

function AddRestaurant() {
	const [values, setValues] = useState({
		name: "",
		location: "",
		type: "",
		opensAt: "",
		error: false,
		success: false,
	});

	const { name, location, type, opensAt, error, success } = values;

	const { user, token } = isAuthenticated();

	const history = useHistory();

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, success: false });
		//backend request fired
		createCategory(user._id, token, { name, location, type, opensAt }).then(
			(data) => {
				if (data.error) {
					alert("failed");
					setValues({
						...values,
						error: true,
						success: false,
					});
				} else {
					alert("success");
					setValues({
						...values,
						name: "",
						location: "",
						type: "",
						opensAt: "",
						error: false,
						success: true,
					});
				}
			},
		);
	};

	const textboxes = [
		{
			label: "Restaurant Name",
			type: "text",
			required: true,
			name: "name",
			value: name,
			style: {
				maxWidth: 300,
				marginTop: "2px",
				marginBottom: "10px",
			},
			onChange: handleChange("name"),
		},
		{
			label: "Location",
			type: "text",
			required: true,
			name: "location",
			value: location,
			style: { maxWidth: 300, marginBottom: "10px" },
			onChange: handleChange("location"),
		},
		{
			label: "Cuisine Type",
			type: "text",
			required: true,
			name: "type",
			value: type,
			style: { maxWidth: 300, marginBottom: "10px" },
			onChange: handleChange("type"),
		},
		{
			label: "Opens At",
			type: "text",
			required: true,
			name: "opensAt",
			value: opensAt,
			style: { maxWidth: 300, marginBottom: "2px" },
			onChange: handleChange("opensAt"),
		},
	];

	return (
		<div>
			<Button variant="contained" style={{display: "flex", margin: "0% 2%"}} onClick={()=>history.push("/admin/dashboard")}>Back to Dashboard</Button>
			<Typography
				variant="h5"
				sx={{ flexGrow: 1 }}
				component="div"
				className="login-text"
				color="black"
			>
				Add Restaurants
			</Typography>
			<Form
				textFields={textboxes}
				submitButtonText="Add Restaurant"
				onSubmit={handleSubmit}
			/>
		</div>
	);
}

export default AddRestaurant;

import { Typography } from "@mui/material";
import Form from "../components/Form";
import { useState } from "react";
import { signup } from "../auth";

function Register() {
	const [errorMessage, setErrorMessage] = useState("");
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		error: null,
		success: false,
	});

	const { name, email, password, confirmPassword, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event });
	};

	function handleSubmit(event) {
		event.preventDefault();
		setValues({ ...values, error: false });
		signup({ name, email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({
						...values,
						name: "",
						email: "",
						password: "",
						confirmPassword: "",
						error: "",
						success: true,
					});
				}
			})
			.catch(() => console.log("Error in signup"));
	}

	const textboxes = [
		{
			label: "name",
			type: "text",
			required: true,
			value: name,
			style: {
				maxWidth: 350,
				marginTop: "2px",
				marginBottom: "10px",
			},
			onChange: handleChange("name"),
		},
		{
			label: "email",
			type: "email",
			required: true,
			value: email,
			style: {
				maxWidth: 350,
				marginBottom: "10px",
			},
			onChange: handleChange("email"),
		},
		{
			label: "password",
			type: "password",
			value: password,
			required: true,
			style: { maxWidth: 350, marginBottom: "2px" },
			onChange: handleChange("password"),
		},
		{
			label: "confirm",
			type: "password",
			value: confirmPassword,
			required: true,
			style: { maxWidth: 350, marginTop: "8px", marginBottom: "2px" },
			onChange: handleChange("confirmPassword"),
		},
	];

	return (
		<div>
			<Typography
				variant="h5"
				sx={{ flexGrow: 1 }}
				component="div"
				className="login-text"
				color="black"
			>
				Register
			</Typography>
			<Form
				textFields={textboxes}
				submitButtonText="Register"
				onSubmit={handleSubmit}
			/>
		</div>
	);
}

export default Register;

import React from "react";
import { styled } from "@mui/material/styles";
import {
	Button,
	Typography,
	Box,
	MenuItem,
	FormControl,
    Select,
    InputLabel
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth";
import { useState, useEffect } from "react";
import Form from "../components/Form";
import { useHistory } from "react-router";

const Input = styled("input")({
	display: "none",
});

function AddDish() {
	const { user, token } = isAuthenticated();
    const [category, setCategory] = useState( "" );
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		offer: "",
		photo: "",
        restaurants: [],
		loading: false,
		error: "",
		createdProduct: "",
		formData: new FormData(),
	});
	const history = useHistory();
	const {
		name,
		description,
		price,
		offer,
        restaurants,
        photo,
		formData,
	} = values;

	const preload = () => {
		getCategories().then((data) => {
			//console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, restaurants: data, formData: new FormData() });
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		createaProduct(user._id, token, formData).then((data) => {
            if ( data.error ) {
                alert( "failed" );
                setValues( { ...values, error: data.error } );
            } else {
                alert( "success" );
				setValues({
					...values,
					name: "",
					description: "",
					price: "",
                    photo: "",
                    offer: "",
					createdProduct: data.name,
                } );
                setCategory( "" );
			}
		});
	};

	const handleChange = (name) => (event) => {
		formData.set(name, event);
		setValues({ ...values, [name]: event });
    };

    const handleChangeCategory= ( event ) => {
        formData.set( "category", event.target.value );
        setCategory(event.target.value)
    }

	const handlePhoto = (event) => {
        formData.set( "photo", event.target.files[0] );
		setValues({ ...values, photo: event.target.files[0] });
	};

	const textboxes = [
		{
			label: "Name of Dish",
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
			label: "Description",
			type: "text",
			required: true,
			name: "description",
			value: description,
			style: { maxWidth: 300, marginBottom: "10px" },
			onChange: handleChange("description"),
		},
		{
			label: "Price",
			type: "number",
			required: true,
			name: "price",
			value: price,
			style: { maxWidth: 300, marginBottom: "10px" },
			onChange: handleChange("price"),
		},
		{
			label: "Offer",
			type: "text",
			required: true,
			name: "offer",
			value: offer,
			style: { maxWidth: 300, marginBottom: "10px" },
			onChange: handleChange("offer"),
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
				Add Dishes
			</Typography>

			<Form
				textFields={textboxes}
				submitButtonText="Add Dish"
				onSubmit={handleSubmit}
			>
				<Box style={{ maxWidth: 300, marginBottom: "2px" }}>
					<label htmlFor="dish-upload-button">
						<Input
							accept="image/*"
							id="dish-upload-button"
							type="file"
							name="photo"
							onChange={handlePhoto}
						/>
						<Button
							variant="contained"
							component="span"
							startIcon={<PhotoCamera />}
						>
							Add a Photo
						</Button>
					</label>
					<Box sx={{ minWidth: 120, marginTop: "10px", marginBottom: "2px" }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Restaurant</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
                                label="Restaurant"
                                name="category"
                                value={category}
								onChange={handleChangeCategory}
                            >
                                {restaurants !== [] && restaurants.map( ( rest, i ) => {
                                    return (
                                        <MenuItem value={rest._id} key={i}>{ rest.name}</MenuItem>
                                    )
                                })}
							</Select>
						</FormControl>
					</Box>
				</Box>
			</Form>
		</div>
	);
}

export default AddDish;

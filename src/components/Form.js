import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Form( props ) {

	function handleTextBoxes( elem ) {
		function handleOnChange( event ) {
			elem.onChange( event.target.value );
		}
		
		if (elem.required) {
			return (
				<TextField
					label={elem.label}
					type={elem.type}
					value={elem.value}
					name={elem.name}
					required
					style={elem.style}
					onChange={handleOnChange}
				/>
			);
		} else {
			return (
				<TextField
					label={elem.label}
					type={elem.type}
					value={elem.value}
					name={elem.name}
					style={ elem.style }
					onChange={handleOnChange}
				/>
			);
		}
	}

	const formData = props.textFields;


	return (
		<form className="form" onSubmit={props.onSubmit} encType="multipart/form-data">
			<Box
				sx={{
					borderStyle: "solid",
					borderWidth: "2.5px",
					boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
					borderRadius: "10px",
					borderColor: "#cbcfd6",
				}}
			>
				<FormGroup>
					{formData.map((elem) => {
						return handleTextBoxes(elem);
					})}
				{props.children}
				</FormGroup>
			</Box>
			<div className="submit-button">
			<Button
					variant="contained"
					color="success"
					size="large"
					type="submit"
				>
					{props.submitButtonText}
				</Button>
			</div>
		</form>
	);
}

export default Form;

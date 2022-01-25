import { Box, CircularProgress } from "@mui/material";

function Loader() {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<CircularProgress color="inherit"/>
		</Box>
	);
}

export default Loader;

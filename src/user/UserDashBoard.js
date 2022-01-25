import React from "react";
import { Box } from "@mui/system";
import { isAuthenticated } from "../auth";
import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

function UserDashBoard() {
	const history = useHistory();
	const data = () => {
		const googleProfile = localStorage.getItem("googleProfile");
		if (isAuthenticated() !== false) {
			return isAuthenticated().user;
		} else if (googleProfile !== null) {
			return googleProfile;
		}
	};
	return (
		<div>
			<Box>
				<Typography
					variant="h4"
					component="div"
					alignItems="center"
					justifyContent="center"
					display="flex"
				>
					Welcome, {data().name}
				</Typography>
				<div className="user-dashboard-body-text">
					<Typography
						variant="h6"
						component="div"
						alignItems="center"
						justifyContent="center"
						display="flex"
					>
						Hello
					</Typography>
				</div>
				<div className="user-dashboard-buttons">
					<Button
						variant="text"
						color="info"
						onClick={() => {
							history.push("/");
						}}
					>
						Update Profile
					</Button>
					<Button
						variant="text"
						color="info"
						onClick={() => {
							history.push("/");
						}}
					>
						Check Orders
					</Button>
				</div>
			</Box>
		</div>
	);
}

export default UserDashBoard;

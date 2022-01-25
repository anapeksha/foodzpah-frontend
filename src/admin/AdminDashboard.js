import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AdminNavbar from "./AdminNavbar";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

function AdminDashboard() {

	const getUserName = () => {
		const data = isAuthenticated();
		if ( data !== undefined ) {
			return data.user.name;
		}
		else {
			return <Redirect to="/login"/>
		}
	}
	const getUserEmail = () => {
		const data = isAuthenticated();
		if ( data !== undefined ) {
			return data.user.email;
		}
		else {
			return <Redirect to="/login" />
		}
	}
	const message = `Name : ${getUserName()} \n Email: ${getUserEmail()}`;
	return (
		<div>
			<div className="admin-dashboard-heading">
				<Typography variant="h5">Welcome, Admin</Typography>
			</div>
			<Box className="admin-dashboard">
				<AdminNavbar />
				<Box className="admin-dashboard-text">
				<div className="new-line">
					<Typography variant="h6" component="h1">{ message}</Typography>
				</div>
				</Box>
				<Divider />
			</Box>
		</div>
	);
}

export default AdminDashboard;

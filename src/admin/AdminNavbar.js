import { Box, Divider } from "@mui/material";
import { useHistory } from "react-router-dom";
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function AdminNavbar() {
	const [openRestaurant, setOpenRestaurant] = React.useState( false);
	const [openDish, setOpenDish] = React.useState(false);
	const [openOrder, setOpenOrder] = React.useState( false );
	const history = useHistory();

	const handleClick = (name) => {
		if (name === "restaurants") {
			setOpenRestaurant(!openRestaurant);
		} else if (name === "dishes") {
			setOpenDish(!openDish);
		} else if (name === "orders") {
			setOpenOrder(!openOrder);
		}
	};

	return (
		<Box className="admin-navbar">
		<List
			sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Admin Controls
				</ListSubheader>
			}
		>
			<ListItemButton onClick={() => handleClick("restaurants")}>
				<ListItemIcon>
					<RestaurantRoundedIcon />
				</ListItemIcon>
				<ListItemText primary="Restaurants" />
				{openRestaurant ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={openRestaurant} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }} onClick={()=>history.push("/admin/create/category")}>
						<ListItemIcon>
							<ArrowRightRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Add Restaurant" />
					</ListItemButton>
					<Divider/>
					<ListItemButton sx={{ pl: 4 }} onClick={()=>history.push("/admin/categories")}>
						<ListItemIcon>
						<ArrowRightRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Manage Restaurants" />
					</ListItemButton>
				</List>
			</Collapse>
			<ListItemButton onClick={() => handleClick("dishes")}>
				<ListItemIcon>
					<FastfoodIcon />
				</ListItemIcon>
				<ListItemText primary="Dish" />
				{openDish ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={openDish} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }} onClick={()=>history.push("/admin/create/product")}>
						<ListItemIcon>
						<ArrowRightRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Add Dish" />
					</ListItemButton>
					<Divider/>
					<ListItemButton sx={{ pl: 4 }} onClick={()=>history.push("/admin/products")}>
						<ListItemIcon>
						<ArrowRightRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Manage Dishes" />
					</ListItemButton>
				</List>
			</Collapse>
			<ListItemButton onClick={() => handleClick("orders")}>
				<ListItemIcon>
					<MenuBookRoundedIcon />
				</ListItemIcon>
				<ListItemText primary="Orders" />
				{openOrder ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={openOrder} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }} onClick={()=>history.push("/admin/orders")}>
						<ListItemIcon>
							<ArrowRightRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Manage Orders" />
					</ListItemButton>
				</List>
			</Collapse>
			</List>
		</Box>
	);
}

export default AdminNavbar;

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { signout, isAuthenticated } from "../auth";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}),
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
	// @ts-ignore
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `-${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

function Navbar(props) {
	const history = useHistory();
	const theme = useTheme();
	const [open, setOpen] = React.useState( false );
	
	const refreshPageAndredirect = () => {
		history.push( "/" );
		window.location.reload();
	 }

	const handleDrawerOpen = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
		}, 5000);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className="navbar">
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					open={open}
					sx={{ backgroundColor: "#5C7AEA" }}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(open && { display: "none" }) }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap component="div">
							<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
								Foodzpah
							</Link>
						</Typography>
						{isAuthenticated() && (
							<Link
								to="/cart"
								style={{ textDecoration: "none", color: "inherit" }}
							>
								<IconButton
									color="inherit"
									aria-label="shopping cart"
									edge="end"
								>
									<ShoppingCartRoundedIcon />
								</IconButton>
							</Link>
						)}
					</Toolbar>
				</AppBar>
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
					variant="temporary"
					anchor="left"
					open={open}
				>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "ltr" ? (
								<ChevronLeftIcon />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
							<ListItem button key="Home">
								<ListItemIcon>
									<HomeRoundedIcon />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</ListItem>
						</Link>
						<Link
							to="/explore"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button key="Explore">
								<ListItemIcon>
									<ExploreRoundedIcon />
								</ListItemIcon>
								<ListItemText primary="Explore" />
							</ListItem>
						</Link>
					</List>
					<Divider />
					<List>
						{!isAuthenticated() && (
							<div>
								<Link
									to="/login"
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<ListItem button key="Login">
										<ListItemIcon>
											<AccountCircleRoundedIcon />
										</ListItemIcon>
										<ListItemText primary="Login" />
									</ListItem>
								</Link>
								<Link
									to="/register"
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<ListItem button key="Register">
										<ListItemIcon>
											<BorderColorRoundedIcon />
										</ListItemIcon>
										<ListItemText primary="Register" />
									</ListItem>
								</Link>
							</div>
						)}
						{isAuthenticated() && isAuthenticated().user.role === 1 && (
							<div>
								<Link
									to="/admin/dashboard"
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<ListItem button key="Profile">
										<ListItemIcon>
											<AccountCircleRoundedIcon />
										</ListItemIcon>
										<ListItemText primary="Admin" />
									</ListItem>
								</Link>
								<ListItem
									button
									key="Logout"
									onClick={() => {
										signout(() => {
											history.push("/");
										});
									}}
								>
									<ListItemIcon>
										<LogoutIcon />
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</ListItem>
							</div>
						)}
						{isAuthenticated() && isAuthenticated().user.role === 0 && (
							<div>
								<Link
									to="/user/dashboard"
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<ListItem button key="Profile">
										<ListItemIcon>
											<AccountCircleRoundedIcon />
										</ListItemIcon>
										<ListItemText primary="User" />
									</ListItem>
								</Link>
								<ListItem
									button
									key="Logout"
									onClick={() => {
										signout( () => {
											refreshPageAndredirect();
										});
									}}
								>
									<ListItemIcon>
										<LogoutIcon />
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</ListItem>
							</div>
						)}
					</List>
				</Drawer>
				<Main open={open}>
					<DrawerHeader />
				</Main>
			</Box>
		</div>
	);
}

export default Navbar;

import {
	Typography,
	Card,
	CardContent,
	CardActions,
	IconButton,
	Collapse,
	styled,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import ImageHelper from "../pages/helper/ImageHelper";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

function Cards({
	product,
	addtoCart = true,
	removeFromCart = false,
	setReload = (f) => f,
	//   function(f){return f}
	reload = undefined,
}) {
	const [expanded, setExpanded] = useState( false );
	const dispatch = useDispatch();
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const [redirect, setRedirect] = useState(false);
	const cartTitle = product ? product.name : "A photo from unsplash";
	const cartDescription = product ? product.description : "Default description";
	const cartPrice = product ? product.price : "DEFAULT";

	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};
	const showAddToCart = () => {
		return (
			addtoCart && (
				<IconButton aria-label="add to cart" onClick={() => {
					dispatch( addToCart( product ) );
					setRedirect( true );
				}}>
					<AddCircleOutlineRoundedIcon />
				</IconButton>
			)
		);
	};

	return (
		<Card variant="outlined" style={{boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"}}>
			{getARedirect(redirect)}
			<ImageHelper product={product} />
			<CardContent>
				<Typography variant="h5" component="div">
					{cartTitle}
				</Typography>
				<Typography variant="subtitle1" component="div">
				₹{cartPrice}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{showAddToCart()}
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography variant="subtitle1" component="div">
						{cartDescription}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}

export default Cards;

import * as React from "react";
import { CardActionArea, Card } from "@mui/material";
import ImageHelper from "../pages/helper/ImageHelper";
export default function CartCards( props ) {
	return (
		<Card sx={{ maxWidth: 375, boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }}>
			<CardActionArea>
				<ImageHelper product={props.product}/>
			</CardActionArea>
		</Card>
	);
}

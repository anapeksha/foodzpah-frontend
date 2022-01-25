import * as React from "react";
import { Typography, Box, IconButton, Stack } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { incrementQty, decrementQty } from "../redux/reducer/cartReducer";

function QtySelector(props) {
	const dispatch = useDispatch();

	return (
		<Box className="qty-update-box" component="div" width="85px"> 
			<Stack direction="row" spacing={0.1}>
				<IconButton
					color="error"
					onClick={() => {
						dispatch(decrementQty(props.productObj));
					}}
				>
					<RemoveCircleRoundedIcon />
				</IconButton>
				<Typography variant="subtitle2" component="p">
					{props.productObj.count}
				</Typography>
				<IconButton
					color="success"
					onClick={() => {
						dispatch(incrementQty(props.productObj));
					}}
				>
					<AddCircleRoundedIcon />
				</IconButton>
			</Stack>
		</Box>
	);
}

export default QtySelector;

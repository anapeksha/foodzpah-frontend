import Typography from "@mui/material/Typography";

function Home() {
	return (
		<div>
			<div className="home">
				<Typography
					variant="h1"
					component="div"
					alignItems="center"
					justifyContent="center"
					display="flex"
				>
					Foodzpah
				</Typography>
				<Typography
					variant="body2"
					component="div"
					alignItems="center"
					justifyContent="center"
					display="flex"
				>
					Love your hunger
				</Typography>
				<p>Browse our favourites</p>
			</div>
			<div className="break-img">
				<br />
			</div>
			<br />
		</div>
	);
}

export default Home;

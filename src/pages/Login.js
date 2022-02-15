import { LoadingButton } from "@mui/lab";
import { CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import validator from "validator";
import { authenticate, isAuthenticated, signin } from "../auth";
import Form from "../components/Form";

function Login() {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: null,
		loading: false,
		didRedirect: false,
	});

	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();

	const responseGoogleSuccess = ( res ) => {
		if ( res.statusText === 'OK' ) {
			localStorage.setItem( "googleProfile", res.profileObj );
			<Redirect to="/user/dashboard"/>
		}
	};

	const responseGoogleFailure = ( res ) => {
		alert( `Error ${res.statusText}` );
		<Redirect to="/"/>
	};

	const passwordValidator = (value) => {
		if (
			validator.isStrongPassword(value, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
		) {
			return "STRONG";
		} else {
			return "NOT STRONG";
		}
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event });
	};

	async function handleSubmit(event) {
		event.preventDefault();
		console.log(email, password);
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					authenticate(data, () => {
						setValues({
							...values,
							didRedirect: true,
						});
					});
				}
			})
			.catch(() => console.log("signin request failed"));
	}

	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else if (user && user.role === 0) {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isAuthenticated()) {
			setTimeout(() => {
				return <Redirect to="/" />;
			}, 1000);
		}
	};

	const textboxes = [
		{
			label: "email",
			type: "email",
			required: true,
			value: email,
			style: {
				maxWidth: 300,
				marginTop: "2px",
				marginBottom: "10px",
			},
			onChange: handleChange("email"),
		},
		{
			label: "password",
			type: "password",
			required: true,
			value: password,
			style: { maxWidth: 300, marginBottom: "2px" },
			onChange: handleChange("password"),
		},
	];

	const progressIcon = () => {
		return <CircularProgress color="error" size={30} />;
	};

	const loadingScreen = () => {
		return (
			<div>
				<LoadingButton
					loading={loading}
					loadingIndicator={progressIcon}
					loadingPosition="center"
				></LoadingButton>
			</div>
		);
	};

	const loginForm = () => {
		return (
			<div>
				<Typography
					variant="h5"
					sx={{ flexGrow: 1 }}
					component="div"
					className="login-text"
					color="black"
				>
					Login
				</Typography>
				<Form
					textFields={textboxes}
					submitButtonText="Login"
					onSubmit={handleSubmit}	
				/>
				<div id="hr-tag-login">
					<hr />
				</div>
				<hr id="hr-tag-login" />
				<div className="google-login-button">
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						buttonText="Sign in with Google"
						onSuccess={responseGoogleSuccess}
						onFailure={responseGoogleFailure}
						isSignedIn={false}
						cookiePolicy={"single_host_origin"}
					/>
				</div>
			</div>
		);
	};

	return (
		<div>
			{loadingScreen()}
			{loginForm()}
			{performRedirect()}
		</div>
	);
}

export default Login;

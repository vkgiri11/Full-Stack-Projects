import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useCookies } from "react-cookie";

const AuthModal = ({ setShowModal, isSignUp }) => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [errors, setErrors] = useState(null);
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);

	let navigate = useNavigate();

	const handleClick = () => {
		setShowModal(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (isSignUp && password !== confirmPassword) {
				setErrors("Passwords need to Match !!");
			}

			const response = await axios.post(`http://localhost:8000/${isSignUp ? "signup" : "login"}`, {
				email,
				password,
			});

			setCookie("AuthToken", response.data.token);
			setCookie("UserId", response.data.userId);

			if (response.status === 201 && isSignUp) navigate("/login");
			if (response.status === 201 && !isSignUp) navigate("/dashboard");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="auth-modal">
			<div className="close-icon" onClick={handleClick}>
				✘
			</div>
			<h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
			<p>
				By clicking Log in, you agree to our terms. Learm how we process your data in our Privacy and Cookie
				Policy.
			</p>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					required={true}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					required={true}
					onChange={(event) => setPassword(event.target.value)}
				/>
				{isSignUp && (
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Confirm Password"
						required={true}
						onChange={(event) => setConfirmPassword(event.target.value)}
					/>
				)}
				<input className="secondary-button" type="submit" />
				<p>{errors}</p>
			</form>
			<hr />
			<h2>GET THE APP</h2>
		</div>
	);
};

export default AuthModal;

import { useState } from "react";

import Navbar from "./Navbar";
import AuthModal from "./AuthModal";

const Home = () => {
	const [showModal, setShowModal] = useState(false);
	const [isSignUp, setIsSignUp] = useState(true);

	const authToken = false;

	const handleClick = () => {
		setShowModal(true);
		setIsSignUp(true);
	};

	return (
		<div className="overlay">
			<Navbar minimal={false} showModal={showModal} setShowModal={setShowModal} setIsSignUp={setIsSignUp} />
			<div className="home">
				<h1 className="primary-title">Swipe Right</h1>
				<button className="primary-button" onClick={handleClick}>
					{authToken ? "Signout" : "Create Account"}
				</button>
				{showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />}
			</div>
		</div>
	);
};

export default Home;

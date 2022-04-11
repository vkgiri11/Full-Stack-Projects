import colorLogo from "../images/tinder-logo-color.png";
import whiteLogo from "../images/tinder-logo-white.png";

const Navbar = ({ minimal, showModal, setShowModal, setIsSignUp }) => {
	const handleClick = () => {
		setShowModal(true);
		setIsSignUp(false);
	};

	const authToken = false;

	return (
		<nav>
			<div className="logo-container">
				<img className="logo" src={minimal ? colorLogo : whiteLogo} alt="Tinder-Logo" />
			</div>

			{!authToken && !minimal && (
				<button className="nav-button" onClick={handleClick} disabled={showModal}>
					Log In
				</button>
			)}
		</nav>
	);
};

export default Navbar;

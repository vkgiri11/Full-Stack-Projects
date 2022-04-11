import { useState } from "react";

import TinderCard from "react-tinder-card";

import ChatContainer from "./ChatContainer";

const Dashboard = () => {
	const characters = [
		{
			name: "Richard Hendricks",
			url: "https://imgur.com/oPj4A8u.jpg",
		},
		{
			name: "Erlich Bachman",
			url: "https://imgur.com/oPj4A8u.jpg",
		},
		{
			name: "Monica Hall",
			url: "https://imgur.com/oPj4A8u.jpg",
		},
		{
			name: "Jared Dunn",
			url: "https://imgur.com/oPj4A8u.jpg",
		},
		{
			name: "Dinesh Chugtai",
			url: "https://imgur.com/oPj4A8u.jpg",
		},
	];

	const [lastDirection, setLastDirection] = useState();

	const swiped = (direction, nameToDelete) => {
		setLastDirection(direction);
	};

	const outOfFrame = (name) => {};

	return (
		<div className="dashboard">
			<ChatContainer />
			<div className="swiper-container">
				<div className="card-container">
					{characters.map((character) => (
						<TinderCard
							className="swipe"
							key={character.name}
							onSwipe={(dir) => swiped(dir, character.name)}
							onCardLeftScreen={() => outOfFrame(character.name)}
						>
							<div style={{ backgroundImage: "url(" + character.url + ")" }} className="card">
								<h3>{character.name}</h3>
							</div>
						</TinderCard>
					))}
					<div className="swipe-info">{lastDirection ? <p>You Swiped {lastDirection}</p> : <p />}</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

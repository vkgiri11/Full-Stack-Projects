import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Onboarding from "./components/Onboarding";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/login" element={<Onboarding />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

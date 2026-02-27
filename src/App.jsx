import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import GlobalStyleds from "./components/Globalstyleds/Globalstyleds";
import Header from "./components/Header/Header";

function App() {
	return (
		<>
			<GlobalStyleds />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;

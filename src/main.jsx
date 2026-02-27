import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrolltoTop";
import { GlobalProvider } from "./context/GlobalContext";
import AppRoutes from "./routes";

createRoot(document.getElementById("root")).render(
	<GlobalProvider>
		<BrowserRouter>
			<ScrollToTop />
			<AppRoutes />
		</BrowserRouter>
	</GlobalProvider>,
);

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalProvider } from "./context/GlobalContext";

describe("App", () => {
	it("renders App component without crashing", () => {
		render(
			<BrowserRouter>
				<GlobalProvider>
					<App />
				</GlobalProvider>
			</BrowserRouter>,
		);

		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});
});

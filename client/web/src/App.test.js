import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders search engines", () => {
	render(<App />)
	const linkElement = screen.getByText(/Google/i)
	expect(linkElement).toBeInTheDocument()
})

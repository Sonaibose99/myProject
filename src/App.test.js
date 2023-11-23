import { render, screen } from "@testing-library/react";
import App from "./App";

test("currency convertor", () => {
  render(<App />);
  const linkElement = screen.getByText(/currency convertor/i);
  expect(linkElement).toBeInTheDocument();
});

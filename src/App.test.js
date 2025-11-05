import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Pharmacy Management System header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Pharmacy Management System/i);
  expect(headerElement).toBeInTheDocument();
});

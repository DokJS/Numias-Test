import NotFound from "../NotFound";
import { render, screen } from "@testing-library/react";

test("renders NotFound component", () => {
    render(<NotFound />);
    expect(screen.getByText("404 - Not Found!")).toBeInTheDocument();
} )
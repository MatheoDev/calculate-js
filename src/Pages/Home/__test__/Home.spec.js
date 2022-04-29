import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../Home";

describe("Calculate", () => {
  it("should render the home component", async () => {
    const { container } = render(<Home />);
    console.log(container)
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});

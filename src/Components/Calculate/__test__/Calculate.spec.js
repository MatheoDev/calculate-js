import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calculate from "../Calculate";

describe("Calculate", () => {
  it("should render the calculate component", async () => {
    const { container } = render(<Calculate />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});

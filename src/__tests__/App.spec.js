import React from "react";
import { render, cleanup } from "@testing-library/react";
import { App } from "../App";

beforeEach(cleanup);

describe("<App />", () => {
  it("renders the application", () => {
    const { queryByTestId, debug } = render(<App />);
    expect(queryByTestId("application")).toBeTruthy();
  });

  it("renders the application using DarkMode", () => {
    const { queryByTestId } = render(<App darkModeDefault />);
    expect(queryByTestId("application")).toBeTruthy();
    expect(
      queryByTestId("application").classList.contains("darkmode")
    ).toBeTruthy();
  });
});

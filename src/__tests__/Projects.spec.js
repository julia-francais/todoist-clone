import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { firebase } from "../firebase";
import { Projects } from "../components/Projects";
import { useSelectedProjectValue } from "../context";

beforeEach(cleanup);

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => "INBOX")
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: "🎵 MUSIC ",
        projectId: "1",
        userId: "frpo6d2t1Vse6jrBZK0Bw",
        userId: "frpo6d2t1Vse6jrBZK0Bw",
        docId: "michel-scott"
      }
    ]
  }))
}));

describe("<ProjectOverlay />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("Success", () => {
    it("renders the projects", () => {
      const { queryByTestId } = render(<Projects />);
      expect(queryByTestId("project-action")).toBeTruthy();
    });

    it("renders the projects and selects an active project using on click", () => {
      const { queryByTestId } = render(<Projects activeValue="1" />);
      expect(queryByTestId("project-action")).toBeTruthy();

      fireEvent.click(queryByTestId("project-action"));
      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeTruthy();
    });

    it("renders the projects and selects an active project using on keyDown", () => {
      const { queryByTestId } = render(<Projects activeValue="1" />);
      expect(queryByTestId("project-action")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("project-action"));
      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeTruthy();
    });

    it("renders the projects with no active value", () => {
      const { queryByTestId } = render(<Projects activeValue="1" />);
      expect(queryByTestId("project-action")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("project-action"));
      expect(
        queryByTestId("project-action-parent").classList.contains(
          "sidebar__project"
        )
      ).toBeTruthy();
    });
  });
});

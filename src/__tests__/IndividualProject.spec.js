import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { firebase } from "../firebase";
import { IndividualProject } from "../components/IndividualProject";
import { useSelectedProjectValue } from "../context";

beforeEach(cleanup);

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() =>
            Promise.resolve("Never mock firebase, but I did")
          ),
          update: jest.fn()
        }))
      }))
    }))
  }
}));

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => "INBOX")
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: "📚 WORDS",
        projectId: "4",
        userId: "frpo6d2t1Vse6jrBZK0Bw",
        docId: "michel-scott"
      }
    ]
  }))
}));

describe("<IndividualProject />", () => {
  const project = {
    name: "📚 WORDS",
    projectId: "4",
    userId: "frpo6d2t1Vse6jrBZK0Bw",
    docId: "michel-scott"
  };

  describe("Success", () => {
    it("renders our project", () => {
      const { getByText } = render(<IndividualProject project={project} />);
      expect(getByText("📚 WORDS")).toBeTruthy();
    });

    it("renders the delete overlay and then deletes a project using onClick", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.click(queryByTestId("delete-project"));
      expect(
        getByText("Are you sure you want to delete this project?")
      ).toBeTruthy();

      fireEvent.click(getByText("Delete"));
    });
  });
});

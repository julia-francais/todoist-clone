import React from "react";
import { firebase } from "../firebase";

export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .update({
        archived: true
      });
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      arial-label={`Mark ${taskDesc} as done`}
      onClick={() => archiveTask()}
      onKeyDown={() => archiveTask()}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox"></span>
    </div>
  );
};

import React from "react";
import PropTypes from "prop-types";
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

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired
};

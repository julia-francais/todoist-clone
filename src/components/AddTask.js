import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment()
        .add(7, "days")
        .format("DD/MM/YYYY");
    }
    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: "frpo6d2t1Vse6jrBZK0Bw"
        })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain("");
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          arial-label=" Add task"
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={() => setShowMain(!showMain)}
          role="button"
          tabIndex={0}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  arial-label=" Cancel adding task"
                  data-testid="add-task-quick-cancel"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  onKeyDown={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  x
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            arial-label=" Enter your Task"
            className="add-task__content"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyPress={e => setTask(e.target.value)}
            role="button"
            tabIndex={0}
          />
          <button
            type="button"
            arial-label=" Submit your entered task"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
            }
            onKeyDown={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
            }
            role="button"
            tabIndex={0}
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              onKeyDown={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              role="button"
              tabIndex={0}
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
            role="button"
            tabIndex={0}
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={() => setShowTaskDate(!showTaskDate)}
            role="button"
            tabIndex={0}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

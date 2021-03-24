import React from "react";


function Task(props) {
  return (
    <li className={props.done ? "text-decoration-line-through text-muted list-group-item d-flex" : "list-group-item d-flex"}>
      <div>
        <div
          className=" me-3 border-2 border-secondary d-flex justify-content-start"
          onClick={() => props.completeThis(props.taskNumber, 'done')}
        >
          {props.done ? (
            <i className="bi bi-check-circle text-success"></i>
          ) : (
            <i className="bi bi-circle"></i>
          )}
        </div>
      </div>
      {props.text}
      <i
        className="bi bi-x fs-3 ms-3 px-3 d-flex justify-content-end position-absolute end-0"
        onClick={() => props.completeThis(props.taskNumber, 'deleted')}
      />
    </li>
  );
}

export default Task;

import React from "react";
import Task from "./Task";

class App extends React.Component {
  constructor() {
    super();
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hitEnter = this.hitEnter.bind(this);
    //this.closeThisB = this.closeThisB.bind(this);
    this.completeThis = this.completeThis.bind(this);
    this.state = {
      newTask: "",
      taskArray: [],
      taskNumber: 1,
      removedTasks: [],
      taskStatus: "All",
    };
  }

  componentDidMount() {
    let taskArray = window.localStorage.getItem("taskArray");
    let taskNumber = window.localStorage.getItem("taskNumber");

    if (taskArray) {
      this.setState({ taskArray: JSON.parse(taskArray) });
      this.setState({ taskNumber: JSON.parse(taskNumber) });
    } else {
      window.localStorage.setItem("taskArray", []);
      window.localStorage.setItem("taskNumber", 1);
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem(
      "taskArray",
      JSON.stringify(this.state.taskArray)
    );
    window.localStorage.setItem(
      "taskNumber",
      JSON.stringify(this.state.taskNumber)
    );
  }

  addTask() {
    if (this.state.newTask !== "") {
      const newTaskNum = this.state.taskNumber + 1;
      const newArray = this.state.taskArray.concat({
        name: this.state.newTask,
        done: false,
        taskNumber: newTaskNum,
        deleted: false,
      }); // We made a new copy of taskArray because we cannot push to a const.  React can with setState.
      this.setState({
        taskArray: newArray,
        newTask: "",
        taskNumber: newTaskNum,
      }); // setState of taskArray, then updated the input to blank.
    }
    //console.log(this.state.taskArray);
  }

  handleChange(event) {
    this.setState({ newTask: event.target.value });
  }

  hitEnter(props) {
    if (props.which === 13) {
      this.addTask();
    }
  }

  completeThis(id, param) {
    let newArray = this.state.taskArray.map((taskObj) => {
      if (taskObj.taskNumber === id) {
        taskObj[param] = !taskObj[param];
      }
      return taskObj;
    });
    this.setState({ taskArray: newArray });
  }
  // closeThisB(id) {
  //   let newArr = this.state.taskArray.filter((task) => task.taskNumber !== id);
  //   this.setState({ taskArray: newArr });
  // }

  render() {
    let renderArray = this.state.taskArray.filter((el) => el.deleted === false);

    if (this.state.taskStatus === "Active") {
      renderArray = renderArray.filter((el) => el.done === false);
    } else if (this.state.taskStatus === "Complete") {
      renderArray = renderArray.filter((el) => el.done === true);
    }

    return (
      <div className="App text-center container-fluid col-8 mt-5">
        <header className="h1">To Do List</header>
        <div className="input-group input-group-lg">
          <input
            type="text"
            className="form-control border-dark"
            placeholder="Enter Task Here"
            value={this.state.newTask}
            onChange={this.handleChange}
            onKeyPress={this.hitEnter}
          />
        </div>
        <ul className="list-group">
          {renderArray.map((value, index) => {
            return (
              <Task
                text={value.name}
                key={index}
                keyID={index}
                completeThis={this.completeThis}
                taskNumber={value.taskNumber}
                closeThisB={this.closeThisB}
                done={value.done}
                deleted={value.deleted}
              />
            );
          })}
        </ul>
        <div className="row text-center justify-content-evenly">
          <div className="col-sm-2">
            <div className="btn btn-sm">{renderArray.length} Tasks</div>
          </div>
          <button
            className="col-sm-2 btn btn-sm btn-outline-dark"
            onClick={() => this.setState({ taskStatus: "All" })}
          >
            All
          </button>
          <button
            className="col-sm-2 btn btn-sm btn-outline-dark"
            onClick={() => this.setState({ taskStatus: "Active" })}
          >
            Active
          </button>
          <button
            className="col-sm-2 btn btn-sm btn-outline-dark"
            onClick={() => this.setState({ taskStatus: "Complete" })}
          >
            Complete
          </button>
        </div>
        <div className="mt-5 row d-flex text-center justify-content-evenly">
          <button className="col-sm-2 btn btn-sm btn-outline-dark">
            Delete All Completed
          </button>
          <button className="col-sm-2 btn btn-sm btn-outline-dark">
            Mark Complete Active
          </button>
        </div>
      </div>
    );
  }
}

export default App;

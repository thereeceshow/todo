import React from "react";
import Task from "./Task";

class App extends React.Component {
  constructor() {
    super();
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hitEnter = this.hitEnter.bind(this);
    this.closeThisB = this.closeThisB.bind(this);
    this.state = {
      newTask: "",
      removeTask: {},
      currentView: 0,
      done: false,
      taskArray: [],
      taskNumber: 1,
      removedTasks: [],
    };
  }
  addTask() {
    if (this.state.newTask !== "") {
      const newTaskNum = this.state.taskNumber;
      const newArray = this.state.taskArray.concat({
        name: this.state.newTask,
        done: false,
        taskNumber: newTaskNum + 1,
      }); // We made a new copy of taskArray because we cannot push to a const.  React can with setState.
      this.setState({ taskArray: newArray, newTask: "" }); // setState of taskArray, then updated the input to blank.
    }
  }

  handleChange(event) {
    this.setState({ newTask: event.target.value });
  }

  hitEnter(props) {
    if (props.which === 13) {
      this.addTask();
    }
  }

  closeThisB(index) {
    const entry = this.state.taskArray[index];
    const remove = this.state.taskArray.filter(task => task !== entry);
    const newRemovedArray = this.state.removedTasks.concat({
      entry
    });
    //console.log(entry);
    //console.log(remove);
    this.setState({
      taskArray: remove,
      removedTasks: newRemovedArray,
    });
    console.log(this.state.removedTasks);
    
  }

  render() {
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
          {/* <button
            className="btn btn-outline-primary d-none d-md-block"
            type="button"
            onClick={this.addTask}
          >
            Add
          </button> */}
        </div>
        <ul className="list-group">
          {this.state.taskArray.map((value, index) => {
            return (
              <Task
                text={value.name}
                key={index}
                keyID={index}
                taskNumber={value.taskNumber}
                closeThisB={this.closeThisB}
              />
            );
          })}
        </ul>
        <div className="row text-center justify-content-evenly">
          <div className="col-sm-2">
            <div className="btn btn-sm">
              <i className="bi bi-x">Items</i>
            </div>
          </div>
          <div className="col-sm-2 btn btn-sm btn-outline-dark">All</div>
          <div className="col-sm-2 btn btn-sm btn-outline-dark">Active</div>
          <div className="col-sm-2 btn btn-sm btn-outline-dark">Complete</div>
        </div>
      </div>
    );
  }
}

export default App;

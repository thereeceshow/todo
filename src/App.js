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
      view: "All",
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

  completeAll(param) {
    let newArray = this.state.taskArray.map((taskObj) => { 
      if (param === 'deleted' && taskObj.done) {
        taskObj[param] = true;
      } else if (param === 'done' && !taskObj.done) { 
        taskObj[param] = true;
      } else if (param === 'active' && taskObj.done) { 
        taskObj.done = false;
      }
      return taskObj
  });
  this.setState({ taskArray: newArray })
}

  render() {
    const filterHelper = (item) => {
      if (!item.deleted) {
        if (this.state.view === "Active" && !item.done) {
          return item;
        } else if (this.state.view === "Complete" && item.done) {
          return item;
          } else if (this.state.view === "All"){
            return item;
        }
      }
    };
    const mapHelper = (value, index) => {
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
    };
    const renderArray = this.state.taskArray
      .filter(filterHelper)
      .map(mapHelper);

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
        <ul className="list-group">{renderArray}</ul>
        <div className="row text-center justify-content-evenly">
          <div className="col-sm-2">
            <div className="btn btn-sm">{renderArray.length} Tasks</div>
          </div>
          <button
            className="col-sm-2 btn btn-sm btn-outline-dark"
            onClick={() => this.setState({ view: "All" })}
          >
            All
          </button>
          <button
            className="col-sm-2 btn btn-sm btn-outline-dark"
            onClick={() => this.setState({ view: "Active" })}
          >
            Active
          </button>
          <button
            className="col-sm-2 btn btn-sm btn-outline-success"
            onClick={() => this.setState({ view: "Complete" })}
          >
            Complete
          </button>
        </div>
        <div className="mt-5 row d-flex text-center justify-content-evenly">
          <button className="col-sm-2 col-md-3 btn rounded-pill btn-sm btn-rounded btn-outline-success" onClick={() => this.completeAll('done')}>
            Mark All Completed
          </button>
          <button className="col-sm-2 col-md-3 btn rounded-pill btn-sm btn-rounded btn-outline-danger" onClick={() => this.completeAll('deleted')}>
            Delete All Completed
          </button>
          <button className="col-sm-2 col-md-3 btn rounded-pill btn-sm btn-rounded btn-outline-warning" onClick={() => this.completeAll('active')}>
            Mark All Active
          </button>
        </div>
      </div>
    );
  }
}

export default App;

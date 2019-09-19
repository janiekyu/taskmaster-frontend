import React, {useState, useEffect} from 'react';
import './App.css';

let form = new FormData();

function App() {

//const API = 'http://TaskmasterJane-env.eiqxpq93um.us-west-2.elasticbeanstalk.com//tasks';

//const API = 'http://localhost:5000/tasks';

// const API = 'https://kd0e6nsrr6.execute-api.us-west-2.amazonaws.com/dev/tasks';

const API = 'https://kd0e6nsrr6.execute-api.us-west-2.amazonaws.com/dev/tasks';

function _handleChange(event) {
  let value = event.target.files ? event.target.files[0] : event.target.value;
  form.set(event.target.name, value);
}

function _upload(event) {
  event.preventDefault();
  fetch(API, {
    method: "POST",
    mode: 'no-cors',
    body: form,
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log(response));
  
}

  const [tasks, setTasks] = useState([]);

  function _getTasks(){
    fetch(API)
      .then(data => data.json())
      .then(
        function(fetchedTasks) {
          console.log(fetchedTasks);
          setTasks(fetchedTasks);
        })
        .catch(console.error)
  }

  useEffect(_getTasks, []);

  return (

    <div className="container"> 
    <div className="row">
      <div className="col-sm-6 offset-3">
        <div className="card">
          <div className="card-header"><strong>Create a new task</strong></div>
          {/* <TaskForm /> */}


          <div className="card-body">
    <form onSubmit={_upload} action={API} method="post" encType="multipart/form-data">
      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input onChange={_handleChange} className="form-control" id="title" name="title" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input onChange={_handleChange} className="form-control" id="description" name="description" />
      </div>
      <div className="form-group">
        <label htmlFor="assignee">Assignee</label>
        <input onChange={_handleChange} className="form-control" id="assignee" name="assignee" />
      </div>
      <div className="form-group">
        <label htmlFor="file">Example file input</label>
        <input onChange={_handleChange}  type="file" className="form-control-file" id="file" name="file" />
      </div>

      <button type="submit" className="btn btn-primary">Save Task</button>
    </form>
    </div>


        </div>
      </div>
    </div>
    <div className="row">
    <h2>Number of tasks: {tasks.length}</h2>
    </div>
    <div className="row">

    {tasks.map( (task,idx) => {
          return(

    <div className="col-sm-4" key={task.id}>
    <div className="card">
    <img src={task.pic} alt="card" className="card-img-top"  />
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p>Description: {task.description}</p>
        <p>Assigned to: {task.assignee}</p>
        <p><History history={task.history} /></p>
      </div>
    </div>
    </div>
    )
  })}

    </div>
    </div>

  );
}

function History(props){

  if (props.history) {
    return(
      Object.keys(props.history).map(function(key) {
        return <p key={key}>{key}: {props.history[key]}</p>;
      }) 
    )
  } else {
  return <span>No history</span>;}
}

function TaskForm(props){
  return(
    <div className="card-body">
    <form onSubmit={props._upload} action={props.API} method="post" encType="multipart/form-data">
      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input onChange={props._handleChange} className="form-control" id="title" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input onChange={props._handleChange} className="form-control" id="description" />
      </div>
      <div className="form-group">
        <label htmlFor="assignee">Assignee</label>
        <input onChange={props._handleChange} className="form-control" id="assignee" />
      </div>
      <div className="form-group">
        <label htmlFor="file">Example file input</label>
        <input onChange={props._handleChange}  type="file" className="form-control-file" id="file" />
      </div>

      <button type="submit" className="btn btn-primary">Save Task</button>
    </form>
    </div>
  )
}

export default App;

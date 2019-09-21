import React, { useState, useEffect } from 'react';
import './App.css';

let form2 = new FormData();

function App() {

  const API2 = 'http://TaskmasterJane-env.eiqxpq93um.us-west-2.elasticbeanstalk.com/tasks';

  const [formData, setFormData] = useState({});
  const API = 'https://kd0e6nsrr6.execute-api.us-west-2.amazonaws.com/dev/tasks';

  function _handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function _handleChangeMultiPart(event) {
    let value = event.target.files ? event.target.files[0] : event.target.value;
    form2.set(event.target.name, value);
    //console.log(event.target.name);
    //console.log(value);
  }

  function _upload(event) {
    event.preventDefault();
    fetch(API2, {
      method: "POST",
      mode: 'no-cors',
      body: form2,
    })
    .then(
      function (response) {
        console.log('Success: ', response)
        _getTasks();
        document.getElementById('createTaskPic').reset();
      });

  }

  function _handleSubmit(event) {
    event.preventDefault();
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(formData),

    })
      .then(response => response.json())
      .catch(error => console.error('Error: ', error))
      //.then(response => console.log('Success: ', response))
      .then(
        function (response) {
          //console.log('Success: ', response)
          _getTasks();
          document.getElementById('createTask').reset();
        });
  }

  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then(data => data.json())
      .then(
        function (fetchedTasks) {
          //console.log(fetchedTasks);
          setTasks(fetchedTasks);
        })
      .catch(console.error)
  }

  useEffect(_getTasks, []);

  return (

    <div className="container">
      <div className="row border-bottom">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header bg-primary text-white"><strong>Create a new task</strong></div>
            <div className="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Uses an AWS API Gateway and a Lambda function written in Java</h6><br />
              <form onSubmit={_handleSubmit} id="createTask">
                <div className="form-group">
                  <label htmlFor="title">Task Title</label>
                  <input onChange={_handleChange} className="form-control" id="title" name="title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input onChange={_handleChange} className="form-control" id="description" name="description" required />
                </div>
                <div className="form-group">
                  <label htmlFor="assignee">Assignee</label>
                  <input onChange={_handleChange} className="form-control" id="assignee" name="assignee" required />
                </div>


                <button type="submit" className="btn btn-primary">Create Task</button>
              </form>
            </div>
          </div>
        </div>


        {/* Task with Photo*/}
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header bg-success text-white"><strong>Create a new task with a photo</strong></div>
            <div className="card-body">
              
              <h6 class="card-subtitle mb-2 text-muted">Uses java app deployed on Elastic Bean Stalk</h6><br />
                <form onSubmit={_upload} encType="multipart/form-data" id="createTaskPic">
                  <div className="form-group">
                    <label htmlFor="title">Task Title</label>
                    <input onChange={_handleChangeMultiPart} className="form-control" id="title" name="title" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input onChange={_handleChangeMultiPart} className="form-control" id="description" name="description" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="assignee">Assignee</label>
                    <input onChange={_handleChangeMultiPart} className="form-control" id="assignee" name="assignee" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="file">Task image</label>
                    <input onChange={_handleChangeMultiPart} type="file" className="form-control-file" id="file" name="file" required />
                  </div>

                  <button type="submit" className="btn btn-success">Save Task</button>

                  
                </form>
              
            </div>
          </div>
        </div>

        {/* Routes */}
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header bg-info text-white"><strong>Routes for testing</strong></div>
            <div className="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Routes set up through AWS API Gateway with Lamda integration</h6><br />
            <strong><a className="text-info" href="https://kd0e6nsrr6.execute-api.us-west-2.amazonaws.com/dev/tasks">/tasks</a></strong>
            <ul>
              <li><strong>GET:</strong> returns all tasks from DynamoDB (javascript)</li>
              <li><strong>POST:</strong> creates a new task and creates a record in DynamoDB (java)</li>
            </ul>
            <strong><a className="text-info" href="https://kd0e6nsrr6.execute-api.us-west-2.amazonaws.com/dev/tasks/delete/{id}">/tasks/delete/&#123;id&#125;</a></strong>
            <ul>
              <li><strong>DELETE:</strong> deletes a task by id. Id's are displayed below. (javascript)</li>
            </ul>
            <strong><a className="text-info" href="https://kd0e6nsrr6.execute-api.us-west-2.amazonaws.com/dev/tasks/jane">/tasks/&#123;assignee&#125;</a></strong>
            <ul>
              <li><strong>GET:</strong> returns all tasks assigned to a person (javascript)</li>
            </ul>
            </div>
          </div>
        </div>
        <hr />

      </div>


      <div className="row">
        <h2>Number of tasks: {tasks.length}</h2>
      </div>
      <div className="row">

        {tasks.map((task, idx) => {
          return (

            <div className="col-sm-4" key={task.id}>
              <div className="card">
                <img src={task.pic} alt="card" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p>ID: {task.id}</p>
                  <p>Description: {task.description}</p>
                  <p>Status: {task.status}</p>
                  <p>Assigned to: {task.assignee}</p>
                  <p><History history={task.history} /></p>

                  <DeleteTask API={API} task={task} reload={_getTasks} />

                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  </div>

  );
}

function History(props) {

  if (props.history) {
    return (
      Object.keys(props.history).map(function (key) {
        return <span key={key}>{key}: {props.history[key]}</span>;
      })
    )
  } else {
    return <span>No history</span>;
  }
}

function DeleteTask(props) {
  function _deleteTask(event) {
    event.preventDefault();
    fetch(`${props.API}/delete/${props.task.id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    })
      .catch(error => console.error('Error: ', error))
      .then(() => props.reload());

  }
  return (
    <button onClick={_deleteTask} type="submit" className="btn btn-danger btn-sm">Delete</button>
  )

}


function TaskFormMP(props) {
  return (
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
          <input onChange={props._handleChange} type="file" className="form-control-file" id="file" />
        </div>

        <button type="submit" className="btn btn-primary">Save Task</button>
      </form>
    </div>
  )
}

export default App;

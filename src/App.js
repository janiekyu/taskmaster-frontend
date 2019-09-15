import React, {useState, useEffect} from 'react';
import './App.css';

const API = 'http://taskmaster2-dev.us-west-2.elasticbeanstalk.com/tasks';

function App() {

  const [tasks, setTasks] = useState([]);

  function _getTasks(){
    fetch(API)
      .then(data => data.json())
      .then(fetchedTasks => setTasks(fetchedTasks));
  }

  useEffect(_getTasks, []);

  return (
    <div> 
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Taskmaster</h1>
        <p className="lead">Number of tasks: {tasks.length}</p>
      </div>
    </div>

    <div className="container"> 
    <div className="row">

    {tasks.map( (task,idx) => {
          return(

    <div class="col-sm-4">
    <div class="card">
    <img src="https://www.avnblogfeed.com/wp-content/uploads/2017/06/1497926708_hqdefault.jpg" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{task.title}</h5>
        <p>Description: {task.description}</p>
        <p>Assigned to: {task.assignee}</p>
        <p><History history={task.history} /></p>
      </div>
    </div>
    </div>
    )
  })}

      {/* <div className="col-8 offset-2">

      <ul className="list-group">
        {tasks.map( (task,idx) => {
          return(
            <li key={task.id} className="list-group-item justify-content-between align-items-center">
              <h3>{task.title}</h3>
              <span class="badge badge-primary badge-pill">{task.status}</span>
              <p>Description: {task.description}</p>
              <p>Assigned to: {task.assignee}</p>
              <History history={task.history} />
            </li>
          )
        })}

      </ul>
      </div> */}


    </div>
    </div>
    </div>
  );
}

function History(props){

  if (props.history!==null) {
    return(
      Object.keys(props.history).map(function(key) {
        return <div key={key}>{key}: {props.history[key]}</div>;
      }) 
    )
  } else {
  return <div>No history</div>;}
}

export default App;

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
    <div className="App container">
      <div className="row justify-content-md-center">
    <div className="col-6" >
      <h1>Taskmaster</h1>
      <h2>Number of tasks: {tasks.length}</h2>

      <div className="accordion" id="accordionExample">
      {tasks.map( (task,idx) => {
          return(

            <div className="card" key={task.id}>
              <div className="card-header" id={task.id}>
                <h2 className="mb-0">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={"#"+task.id+1} aria-expanded="false" aria-controls={task.id+1}>
                  {task.title}
                  </button>
                </h2>
              </div>

              <div id={task.id+1} className="collapse show" aria-labelledby={task.id} data-parent="#accordionExample">
                <div className="card-body">
                  <p>Description: {task.description}</p>
                  <p>Assigned to: {task.assignee}</p>
                  <History history={task.history} />
                </div>
              </div>
            </div>

        )
      })}
      </div>
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

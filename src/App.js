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
    <div className="App">
      <h1>Taskmaster</h1>
      <h2>Number of tasks: {tasks.length}</h2>
      <ul>
        {tasks.map( (task,idx) => {
          return(
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Assigned to: {task.assignee}</p>
              <History history={task.history} />
            </li>
          )
        })}

      </ul>
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

import Header from './mycomponents/Header'
import Tasks from './mycomponents/Tasks'
import AddTask from './mycomponents/AddTask'
import { useState, useEffect } from 'react'

const App = () => {

  const [tasks, setTasks] = useState([])
  const [display, setDisplay] = useState(false);

  const addTask = async(task) => {
    // let id;
    // if(tasks.length===0){
    //   id=1;
    // }else{
    //   id = tasks[tasks.length-1].id+1;
    // }
    const res = await fetch(`http://localhost:5000/tasks`,{
      method: "POST",

      headers: {
        "Content-type": "application/json"
      },

      body: JSON.stringify(task)
    })

    const data = await res.json()
    console.log(data);
    setTasks([...tasks, data])
  }

  useEffect(()=>{
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    }
    getTasks();
  }, []) 


  const fetchTasks = async()=>{
    const res = await fetch('http://localhost:5000/tasks');
    const json = await res.json();
    return json;
  }

  const fetchTask = async(id)=>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const json = await res.json();
    return json;
  }

  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  const toggleReminder = async(id) => {

    const taskToToggle = await fetchTask(id);

    const uptask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(uptask)
    })

    const data = await res.json()

    setTasks(
      tasks.map(
        (task) => task.id===id ? 
        {...task, reminder:data.reminder} :
        task
      )
    )
  }

  const showForm = () => {
    setDisplay(!display);
  }

  return (
    <div className="container">
      <Header showForm={showForm} display={display}/>
      {display?<AddTask onAdd={addTask}/>:''}
      {tasks.length ? 
        <Tasks tasks={tasks} onDelete={deleteTask} onReminder={toggleReminder} /> : 
        "No tasks to show"}
    </div>
  );
}

export default App

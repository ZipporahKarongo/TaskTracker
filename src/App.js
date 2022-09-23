import Header from "./components/Header";
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Footer from "./components/Footer";
import HeaderTwo from "./components/HeaderTwo";
import Tasks from "./components/Tasks";
import About from "./components/About";
import AddTask from "./components/AddTask";

import { useState, useEffect } from 'react'


function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async ( ) =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)

    }
    
    getTasks()
  },[])
  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json()

    return data
  }
// delete task function
const deleteTask = async (id) => {
  // console.log('Delete',id)
  await fetch(`http://localhost:3000/tasks/${id}`,{
    method: 'DELETE'
  })
  setTasks(tasks.filter((task) =>task.id !== id))
}
// toggle reminder
const toggleReminder = async (id) => {
  // console.log(id)
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, reminder:!taskToToggle.reminder}
  const res = await fetch(`http://localhost:3000/tasks/${id}`,
  {
    method:'PUT',
    headers:{
    'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
    
  })
  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder:data.reminder}:task))
}
// add task 
const addTask =async (task) => {
  const res = await fetch('http://localhost:3000/tasks',{
    method:'POST',
    headers: {
      'Content-type':'application/json'
    },
    body: JSON.stringify(task)
  })
  const data = await res.json()
  setTasks([...tasks,data])


  // console.log(task)
  // const id = Math.floor(Math.random() * 10000) +1 
  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])
}

const [showAddTask,setShowAddTask] = useState(false)
  return (
    <Router>
    <div className="container">
      <Header title="Task Tracker" onAdd = {()=> setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
      {/* <HeaderTwo /> */}
    
      <Routes>
      <Route path="/"  element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }/>
      <Route path='/about' element={<About/>}></Route>
      </Routes>

      <Footer/>
    </div>
    </Router>

  );
}

export default App;

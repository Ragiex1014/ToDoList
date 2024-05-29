import { useEffect, useState } from "react"
import Header from "./components/header/header"
import Tasks from "./components/tasks/tasks"



const LOCAL_SOTRAGE_KEY = "todo:savedTasks"


function App() {

  const [tasks, setTasks] = useState([])

  const [selected, setSelected] = useState( 
    {
  activeTab : 0,
  
  tabs: [{name : 'All',  filter: () => true}, {name : 'Completed',filter: (element) => element.isCompleted },{name : 'Incompleted', filter: (element) => !element.isCompleted}]
} 
);


  const filteredTasks = tasks.filter(selected.tabs[selected.activeTab].filter)

  const loadSavedTasks = () => {

    const saved = localStorage.getItem(LOCAL_SOTRAGE_KEY)
    if(saved){
      setTasks(JSON.parse(saved))
    }
  }

  useEffect(
    () => {
      loadSavedTasks();
    }, []
  )

  const addTask = (task) => {
      saveTasks([
        ...tasks,
        {
          id : crypto.randomUUID(),
          title: task,
          isCompleted: false
        }
      ])
  }

  const handleTaskCompleted = (taskId) => {
    const completedTasks = tasks.map( task => {
      if(task.id === taskId){
        return{
          ...task,
          isCompleted : !task.isCompleted
        }
      }
      return task;
    })
    saveTasks(completedTasks)
  }

  const deleteTask = (taskId) => {

    const newTask = tasks.filter(task => task.id !== taskId)
    saveTasks(newTask)
  }



  const saveTasks = (newTasks) => {
    setTasks(newTasks)
    localStorage.setItem(LOCAL_SOTRAGE_KEY, JSON.stringify(newTasks));
  } 

  return (
    <>
   <Header onAddTask={addTask}/>

   <Tasks tasks = {filteredTasks} 
   setTasks = {setTasks}
   onComplete={handleTaskCompleted} 
   onDelete={deleteTask} 
   selected={selected}
   setSelected={setSelected}
  />
   </>
  )
}

export default App

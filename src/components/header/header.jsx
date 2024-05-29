import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import styles from './header.module.css'
const Header = ({onAddTask}) => {

  const [taskTitle,setTaskTitle] = useState('')

  const handleSubmit = (event) =>{
    event.preventDefault();
    onAddTask(taskTitle)
    setTaskTitle("")
  }

  const onChangeTitle = (event) => {
    setTaskTitle(event.target.value)
  }



  return (
    <header className={styles.header}>
        <h1>TO-DO LIST</h1>
        <form className={styles.taskForm} onSubmit={handleSubmit}>
            <input placeholder ="Add new task" type="text" value= {taskTitle} onChange={onChangeTitle}></input>
            <button>
                Create
            <FaPlus />
            </button>
        </form>
    </header>
  )
}

export default Header

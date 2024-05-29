import React, { useEffect } from 'react'
import styles from './tasks.module.css'
import Task from '../task/task'
import { useState } from 'react'



const Tasks = ({tasks, onComplete, onDelete, selected, setSelected}) => {


  const handleonClick = (index) =>{
    setSelected({...selected, activeTab: index})
  }

  const toggleStyles = (index) => {
    return index === selected.activeTab ? 'active' : ''
  }

  const taskCompleted = tasks.filter(task => task.isCompleted).length

  return (
    <section className={styles.tasks}>
        <header className={styles.header}> 
        <div>
            <p>Create task</p>
            <span>{tasks.length}</span>
        </div>

        <div>
            <p>Completed</p>
            <span>{taskCompleted} of {tasks.length}</span>
        </div>

        </header>
        <div className='navBar'>
         {selected.tabs.map((elements,index) => (
          <p key={index} className={toggleStyles(index)} onClick={() => {handleonClick(index)}}>{elements.name}</p>
         ))}
        </div>
        <div className={styles.list}>
          {tasks.map(task => (
            <Task key={task.id} 
            task={task} 
            onComplete={onComplete} 
            onDelete={onDelete} 
           />
          ))}
        </div>
    </section>
  )
}

export default Tasks

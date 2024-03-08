import React from 'react'
import { useState } from 'react'

function TodoList () {
  const [todos,setTodos] = useState([])
  const [inputValue,setInputValue] = useState('')

function handleDeleteValue(index)
  {
    const newTodo = [...todos]
    newTodo.splice(index, 1)
    setTodos(newTodo)
  }
  
function handleChangeValue(e)
{
  setInputValue(e.target.value)
}

function handleSubmitValue(e)
{
  e.preventDefault()
  setTodos([...todos, inputValue])
  setInputValue('')
}

  return (
    <div>
      <h1>Daily Todo List</h1>
      <form>
        <input type='text'   value={inputValue} onChange={handleChangeValue}/>
        <button onClick={handleSubmitValue} > AddTodo </button>
      </form>
      <ul>
        {todos.map((todo,index) => (
          <li key={index}>{todo}
          <button onClick={() =>handleDeleteValue(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList;

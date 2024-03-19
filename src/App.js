import React, { useState, useEffect } from 'react';
const getLocalList=()=>{
  const storedTodos = localStorage.getItem('todos');
   if (storedTodos!=null) {
     const newTod = JSON.parse(storedTodos);
     return newTod;
   }else{
    return [];
   }
}
function TodoList() {
  const [todos, setTodos] = useState(getLocalList());
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const checkDueTimes = () => {
      const now = new Date();
      const updatedTodos = todos.map(todo => {
        if (todo.dueTime!=null) {
          const dueTime = new Date(todo.dueTime);
          const timeDiff = dueTime - now;
          if (timeDiff <= 0) {
            todo.status = 'Overdue';
          } else if (timeDiff <= 3600000) { //if more than 1hr
            todo.status = 'DueWithIn1Hour';
          } else if (timeDiff <= 7200000) { //if more than 2hr
            todo.status = 'DueWithIn2Hour';
          } else {
            todo.status = 'Normal';
          }
        } else {
          todo.status = 'NoDueDate';
        }
        return todo;
      });
      setTodos(updatedTodos);
    };
  
    localStorage.setItem('todos', JSON.stringify(todos));
    checkDueTimes(); 
  }, [todos]);
  

  function handleDeleteValue(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function handleChangeValue(e) {
    setInputValue(e.target.value);
  }

  function handleSubmitValue(e) {
    e.preventDefault();
    if (inputValue !== "") {
      setTodos([...todos, { text: inputValue, dueTime: null, status: 'NoDueDate' }]);
      setInputValue('');
    }
  }

  function handleDueTimeChange(index, dueTime) {
    const newTodos = [...todos];
    newTodos[index].dueTime = dueTime;
    setTodos(newTodos);
  }

  function moveItemUp(index) {
    if (index === 0) return;
    const newTodos = [...todos];
    const temp = newTodos[index - 1];
    newTodos[index - 1] = newTodos[index];
    newTodos[index] = temp;
    setTodos(newTodos);
  }

  function moveItemDown(index) {
    if (index === todos.length - 1) return;
    const newTodos = [...todos];
    const temp = newTodos[index + 1];
    newTodos[index + 1] = newTodos[index];
    newTodos[index] = temp;
    setTodos(newTodos);
  }

  return (
    <div className="container">
      <h1>Daily Todo List</h1>
      <form onSubmit={handleSubmitValue}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChangeValue}
          placeholder="Enter your todo here"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ol>
        {todos.map((todo, index) => (
          <li key={index} className={todo.status}>
            <div className="todo-item">
            <span className="todo-text">{index + 1 }.</span> <span className="todo-text">{todo.text}</span> <p></p>   {todo.dueTime},    <span className="todo-text">{todo.status}</span>
            </div>
            <div className="button-list">
            <button onClick={() => handleDeleteValue(index)}>Delete</button>
            <button onClick={() => moveItemUp(index)} disabled={index === 0}>Move Up</button>
            <button onClick={() => moveItemDown(index)} disabled={index === todos.length - 1}>Move Down</button> 
            <p> </p>
            <input type="datetime-local" onChange={e => handleDueTimeChange(index, e.target.value)} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;

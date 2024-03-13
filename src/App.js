import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleDeleteValue(index) {
    const newTodo = [...todos];
    newTodo.splice(index, 1);
    setTodos(newTodo);
  }

  function handleChangeValue(e) {
    setInputValue(e.target.value);
  }

  function handleSubmitValue(e) {
    e.preventDefault();
    setTodos([...todos, inputValue]);
    setInputValue('');
  }

  function moveItemUp(index) {
    if (index === 0) return;
    const newTodos = [...todos];
    //swapping 
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
    <div>
      <h1>Daily Todo List</h1>
      <form>
        <input type='text'   value={inputValue} onChange={handleChangeValue}/>
        <button onClick={handleSubmitValue} > AddTodo </button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteValue(index)}>Delete</button>
            <button onClick={() => moveItemUp(index)}>Move Up</button>
            <button onClick={() => moveItemDown(index)}>Move Down</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

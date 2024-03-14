import React, { useState, useEffect } from 'react';
const getLocalList=()=>{
  const storedTodos = localStorage.getItem('todos');
  // console.log(storedTodos);
   if (storedTodos!=null) {
     const newTod = JSON.parse(storedTodos);
     //console.log(newTod);
     return newTod;
   }else{
    return [];
   }
}
function TodoList() {
  const [todos, setTodos] = useState(getLocalList());
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
   // console.log(todos);
  }, [todos]);

  function handleDeleteValue(index) {
    const newTodo = [...todos];
    newTodo.splice(index, 1);
    setTodos(newTodo);
  }

  function handleChangeValue(e) {
   // if(e.target.value!==""){
    setInputValue(e.target.value);
   // }
  }

  function handleSubmitValue(e) {
    e.preventDefault();
    if(inputValue!==""){
    setTodos([...todos, inputValue]);
    setInputValue('');
    }
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
    <div>
      <h1>Daily Todo List</h1>
      <form onSubmit={handleSubmitValue}>
        <input type='text' value={inputValue} onChange={handleChangeValue} placeholder="Enter your todo here"/>
        <button type="submit">Add Todo</button>
      </form>
      <ol>
        {todos.map((todo, index) => (
          <li key={index}>
            {index + 1}. {todo}
            <button onClick={() => handleDeleteValue(index)}>Delete</button>
            <button onClick={() => moveItemUp(index)}>Move Up</button>
            <button onClick={() => moveItemDown(index)}>Move Down</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;

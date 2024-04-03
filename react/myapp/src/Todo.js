import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let nextId = 0;

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([])

  const handleChange = (event) => {
    setTodo(event.target.value);
  }

  const handleSubmit = (event) => {
    console.log("task added")
    event.preventDefault()
    setTodos(
      [
        ...todos,
         { id: nextId++, item: todo, completed: false}
      ])
    setTodo("")
    console.log(todos)
  }

  const handleDelete = (id) => {
    console.log("delete")
    setTodos(
    todos.filter((t) => t.id !== id)
  )}

  const handleCompleted = (id, checked) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed:checked}
        } else {
          return todo;
        }
      }))
    console.log(todos)
  }


  return (
    <>
      <h3>ToDo App</h3>
      <p>Todos list length: {todos.length}</p>
      <p>Todos completed: {todos.filter((todo) => todo.completed).length}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" focus="true" name="todo" placeholder="To do:" onChange={(handleChange)} value={todo}></input>
        <input type="submit" className="btn btn-secondary m-2"></input>
      </form>
      <Container fluid>
      <ul className="my-1">
        {todos.map((todo) => (
          <li key={todo.id}><Row>
            <Col xs={1}><input type="checkbox" checked={todo.checked} onChange={e => {handleCompleted(todo.id, e.target.checked)}}/></Col>
            <Col>{todo.item}{'   '}
            <button className="btn btn-outline-secondary btn-sm"  onClick={handleDelete.bind(this, todo.id)}>Delete</button></Col>
          </Row></li>
        ))}
      </ul>
      </Container>
    </>
  );
}

export default App;

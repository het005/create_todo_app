import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { stringify, v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const Storage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const togglefinished = () => {
    setshowfinished(!showfinished)
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    Storage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    Storage();
  };

  const handleADD = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    Storage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos, todos);
    Storage();
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[70vh] md:">
        <div className="addTODO my-5">
          <h2 className="text-lg font-bold my-5">Add a TODO</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-3/4  p-3  rounded-xl hover:border-b-indigo-500 "
          />
          <button
            onClick={handleADD}
            className="bg-violet-500 disabled:bg-violet-950 hover:bg-violet-700 transition-all mx-3 p-2 rounded-lg font-bold"
            disabled={todo.length <= 3}
          >
            Save
          </button>
        </div>
        <h1 className="text-xl font-bold">Your TODO`S</h1>
        <input type="checkbox" onChange={togglefinished} checked={showfinished} />
        ShowFinished
        <hr/>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">NO TODO`S DISPLAY</div>}
          {todos.map((item) => {
            return (showfinished || !item.isCompleted) && (<div className="todo flex justify-between w-1/2" key={item.id}>
              <div className="flex gap-6 m-5 text-lg">
                <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="buttons m-2 flex h-full">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-violet-500 hover:bg-violet-700 transition-all mx-3 p-2 rounded-lg text-2xl"
                >
                <FaEdit />
                </button>
                <button
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                  className="bg-violet-500 hover:bg-violet-700 transition-all mx-3 p-2 rounded-lg  text-2xl"
                >
                <MdDelete  />
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Title } from "./components/Title/Title";
import { TodoInput } from "./components/TodoInput/TodoInput";
import { TodoList } from "./components/TodoList/TodoList";

//Obtener datos del localStorage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  //console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [
      {
        id: 1,
        title: "HTML",
        completed: false,
      },
      {
        id: 2,
        title: "CSS",
        completed: false,
      },
      {
        id: 3,
        title: "JavaScript",
        completed: false,
      },
      {
        id: 4,
        title: "React",
        completed: false,
      },
    ];
  }
};

function App() {
  //Estado de las tareas
  const [todos, setTodos] = useState(getLocalItems());

  //Estados de los filtros
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState(todos);

  //Funciones de la aplicación
  const addTodo = (title) => {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 1;
    const newTodo = {
      id: lastId + 1,
      title,
      completed: false,
    };

    const todoList = [...todos];
    todoList.push(newTodo);

    setTodos(todoList);
  };

  const handleSetComplete = (id) => {
    const updatedList = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedList);
  };

  const handleDelete = (id) => {
    let isDelete = window.confirm(`Delete this item?`);
    if (isDelete) {
      const updatedList = todos.filter((todo) => todo.id !== id);
      setTodos(updatedList);
    } else {
      return;
    }
  };

  const handleClearComplete = () => {
    const updatedList = todos.filter((todo) => !todo.completed);
    setTodos(updatedList);
  };

  //Funciones de filtrado
  const showAllTodos = () => {
    setActiveFilter("all");
  };

  const showActiveTodos = () => {
    setActiveFilter("active");
  };

  const showCompletedTodos = () => {
    setActiveFilter("completed");
  };

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredTodos(todos);
    } else if (activeFilter === "active") {
      const activeTodos = todos.filter((todo) => todo.completed === false);
      setFilteredTodos(activeTodos);
    } else if (activeFilter === "completed") {
      const completedTodos = todos.filter((todo) => todo.completed === true);
      setFilteredTodos(completedTodos);
    }
  }, [activeFilter, todos]);

  //Agregar datos al localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="bg-gray-900 min-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-14 px-5">
      <div className="container flex flex-col max-w-xl">
        <Title />
        <TodoInput addTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          activeFilter={activeFilter}
          handleSetComplete={handleSetComplete}
          handleDelete={handleDelete}
          handleClearComplete={handleClearComplete}
          showAllTodos={showAllTodos}
          showActiveTodos={showActiveTodos}
          showCompletedTodos={showCompletedTodos}
        />
      </div>
    </div>
  );
}

export default App;

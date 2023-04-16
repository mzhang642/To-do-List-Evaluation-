const APIs = (() => {
    const createTodo = (newTodo) => {
      return myFetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
    };
  
    const deleteTodo = (id) => {
      return myFetch("http://localhost:3000/todos/" + id, {
        method: "DELETE",
      }).then((res) => res.json());
    };
  
    const getTodos = () => {
      return myFetch("http://localhost:3000/todos").then((res) => res.json());
    };
  
    const updateTodo = (id, updatedTodo) => {
      return myFetch("http://localhost:3000/todos/" + id, {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
    };
  
    return { createTodo, deleteTodo, getTodos, updateTodo };
  })();


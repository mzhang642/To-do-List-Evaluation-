const Model = (() => {
    class State {
     
        #todos; //private field
        #onChange; //function, will be called when setter function todos is called
        constructor() {
          this.#todos = [];
        }
        get todos() {
          return this.#todos;
        }
        set todos(newTodos) {
          console.log("setter function");
          this.#todos = newTodos;
          this.#onChange?.(); // rendering
        }
    
        subscribe(callback) {
          //subscribe to the change of the state todos
          this.#onChange = callback;
        }
      }
    
      const { getTodos, createTodo, deleteTodo, updateTodo } = APIs;
    
      return {
        State,
        getTodos,
        createTodo,
        deleteTodo,
        updateTodo,
      };
    })();
    
// const Model = (() => {
//   class State {
//     #todos; //private field
//     #completedTodos;
//     #onChange; //function, will be called when setter function todos is called
//     constructor() {
//       this.#todos = [];
//       this.#completedTodos = []; //added completedtodos
//     }
//     get todos() {
//       return this.#todos;
//     }
//     set todos(newTodos) {
//       // reassign value
//       console.log('setter function');
//       this.#todos = newTodos;
//       this.#onChange?.(); // rendering
//     }

//     subscribe(callback) {
//       //subscribe to the change of the state todos
//       this.#onChange = callback;
//     }

//     getTodoById(id) {
//       console.log(typeof id);
//       return this.#todos.find((todo) => todo.id === id);
//     }

//     toggleTodoComplete(id) {
//       const index = this.#todos.findIndex((todo) => todo.id === id);
//       if (index !== -1) {
//         this.#todos[index].complete = !this.#todos[index].complete;
//         if (this.#todos[index].complete) {
//           this.#completedTodos.push(this.#todos[index]);
//         } else {
//           const completedIndex = this.#completedTodos.findIndex(
//             (todo) => todo.id === id
//           );
//           if (completedIndex !== -1) {
//             this.#completedTodos.splice(completedIndex, 1);
//           }
//         }
//         this.#onChange?.();
//         console.log(typeof id);
//         editTodo(
//           {
//             content: this.#todos[index].content,
//             complete: this.#todos[index].complete,
//           },
//           id
//         );
//       }
//     }
//   }
//   const { getTodos, createTodo, deleteTodo, editTodo } = APIs;
//   return {
//     State,
//     getTodos,
//     createTodo,
//     deleteTodo,
//     editTodo,
//   };
// })(); 

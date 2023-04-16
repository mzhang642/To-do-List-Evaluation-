const Controller = ((view, model) => {

    const state = new model.State();

    const init = () => {
      model.getTodos().then((todos) => {
        todos.reverse();
        state.todos = todos;
      });
    };
  
    const handleSubmit = () => {
      view.submitBtnEl.addEventListener("click", (event) => {
        const inputValue = view.inputEl.value;
        model.createTodo({ content: inputValue }).then((data) => {
          state.todos = [data, ...state.todos];
          view.clearInput();
        });
      });
    };
  
    const handleDelete = () => {
      view.pendingListEl.addEventListener("click", (event) => {
        if (event.target.className === "delete-btn") {
          const id = event.target.id;
          model.deleteTodo(+id).then((data) => {
            state.todos = state.todos.filter((todo) => todo.id !== +id);
          });
        }
      });
      view.completedListEl.addEventListener("click", (event) => {
        if (event.target.className === "delete-btn") {
          const id = event.target.id;
          model.deleteTodo(+id).then((data) => {
            state.todos = state.todos.filter((todo) => todo.id !== +id);
          });
        }
      });
    };

    const handleEdit = () => {
      const updateTodoContent = (event, listEl) => {
        if (event.target.tagName === 'INPUT') {
          const li = event.target.parentElement;
          const id = li.querySelector(".delete-btn").id;
          const newContent = event.target.value;
          const todo = state.todos.find((todo) => todo.id === +id);
          const updatedTodo = { ...todo, content: newContent };
    
          model.updateTodo(+id, updatedTodo).then((data) => {
            state.todos = state.todos.map((todo) =>
              todo.id === +id ? updatedTodo : todo
            );
          });
        }
      };
    
      const toggleEdit = (event, listEl) => {
        if (event.target.className === "edit-btn") {
          const li = event.target.parentElement;
          li.classList.toggle("editing");
          li.querySelector("input").focus();
        }
      };
    
      view.pendingListEl.addEventListener("click", (event) => {
        toggleEdit(event, view.pendingListEl);
      });
    
      view.completedListEl.addEventListener("click", (event) => {
        toggleEdit(event, view.completedListEl);
      });
    
      view.pendingListEl.addEventListener("blur", updateTodoContent, true);
      view.completedListEl.addEventListener("blur", updateTodoContent, true);
    
      view.pendingListEl.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
          event.target.blur();
        }
      }, true);
    
      view.completedListEl.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
          event.target.blur();
        }
      }, true);
    };
    
  
    const handleMove = () => {
      const moveTodo = (event, listEl) => {
        if (event.target.className === "move-btn") {
          const li = event.target.parentElement;
          const id = li.querySelector(".delete-btn").id;
          const todo = state.todos.find((todo) => todo.id === +id);
          const updatedTodo = { ...todo, completed: !todo.completed };
  
          model.updateTodo(+id, updatedTodo).then((data) => {
            state.todos = state.todos.map((todo) =>
              todo.id === +id ? updatedTodo : todo
            );
          });
        }
      };
      view.pendingListEl.addEventListener("click", (event) => {
        moveTodo(event, view.pendingListEl);
      });
      view.completedListEl.addEventListener("click", (event) => {
        moveTodo(event, view.completedListEl);
      });
    };
  
    const bootstrap = () => {
      init();
      handleSubmit();
      handleDelete();
      handleEdit();
      handleMove();
      state.subscribe(() => {
        view.renderTodos(state.todos);
      });
    };
  
    return {
      bootstrap,
    };
    
  })(View, Model);
  
  Controller.bootstrap();


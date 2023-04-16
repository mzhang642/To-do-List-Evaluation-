const View = (() => {
    const pendingListEl = document.querySelector(".pending-list");
    const completedListEl = document.querySelector(".completed-list");
    const submitBtnEl = document.querySelector(".submit-btn");
    const inputEl = document.querySelector(".input");
  
    const renderTodos = (todos) => {
      let pendingTemplate = "";
      let completedTemplate = "";
  
      todos.forEach((todo) => {
        const liTemplate = `<li${todo.completed ? ' class="editing"' : ''}>
        <input value="${todo.content}" />
        <span>${todo.content}</span>
        <button class="edit-btn" id="${todo.id}" title="Edit"></button>
        <button class="move-btn" id="${todo.id}" title="Move"></button>
        <button class="delete-btn" id="${todo.id}" title="Delete"></button>
        </li>`;
        if (todo.completed) {
          completedTemplate += liTemplate;
        } else {
          pendingTemplate += liTemplate;
        }
      });
  
      pendingListEl.innerHTML = pendingTemplate || "<h4>no pending tasks!</h4>";
      completedListEl.innerHTML = completedTemplate || "<h4>no completed tasks!</h4>";
    };
  
    const clearInput = () => {
      inputEl.value = "";
    };
  
    return {
      renderTodos,
      submitBtnEl,
      inputEl,
      clearInput,
      pendingListEl,
      completedListEl,
    };
  })();


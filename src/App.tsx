import React from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { TodoPanel } from "./components/TodoPanel/TodoPanel";
import { TodoList } from "./components/TodoList/TodoList";

const DEFAULT_TODO_LIST = [
  { id: 1, name: "Покупки", description: "Купить помидоры", checked: false },
];

export const App = () => {
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<number | null>(null);
  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);

  const selectTodoIdForEdit = (id: Todo["id"]) => {
    setTodoIdForEdit(id);
  };

  const deleteTodo = (id: Todo["id"]) => {
    const deletedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTodo);
  };

  const addTodo = ({ name, description }: Omit<Todo, "id" | "checked">) => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const addedTodo = [
      ...todos,
      { id: newId, description, name, checked: false },
    ];
    setTodos(addedTodo);
  };

  const checkTodo = (id: Todo["id"]) => {
    const checkedTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    setTodos(checkedTodo);
  };

  const changeTodo = ({ name, description }: Omit<Todo, "id" | "checked">) => {
    const changedTodo = todos.map((todo) => {
      if (todo.id === todoIdForEdit) {
        return { ...todo, name, description };
      }
      return todo;
    });
    setTodos(changedTodo);
    setTodoIdForEdit(null);
  };

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <Header todoCount={todos.length} />
        <TodoPanel mode="add" addTodo={addTodo} />
        <TodoList
          todoIdForEdit={todoIdForEdit}
          todos={todos}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
          selectTodoIdForEdit={selectTodoIdForEdit}
          changeTodo={changeTodo}
        />
      </div>
    </div>
  );
};

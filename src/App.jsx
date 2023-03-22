import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/inputTodo";
import { IncompleteTodos } from "./components/incompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, SetTodoText] = useState("");
  const [incompleteTodos, SetIncompleteTodos] = useState([
    "ああああ",
    "いいいい"
  ]);
  const [completeTodos, SetCompleteTodos] = useState(["ううううう"]);
  const onChangeTodoText = (event) => SetTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    SetIncompleteTodos(newTodos);
    SetIncompleteTodos("");
  };
  const onClickDelete = (index) => {
    const newTodos = { ...incompleteTodos };
    newTodos.splice(index, 1);
    SetIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = { ...incompleteTodos };
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    SetIncompleteTodos(newCompleteTodos);
    SetCompleteTodos(SetIncompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[1]];
    SetCompleteTodos(newIncompleteTodos);
    SetIncompleteTodos(newIncompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録は５個まで。TODO削除して下さい。</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

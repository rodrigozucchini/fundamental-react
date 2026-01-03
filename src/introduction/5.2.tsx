import { useState } from 'react';

interface Todo {
  text: string;
  completed: boolean;
}

// External data used as initial state
const TODOS: Todo[] = [
  { text: 'Aprender React', completed: true },
  { text: 'Entender useState', completed: false },
  { text: 'Usar props', completed: true },
];

interface TodoCounterProps {
  total: number;
  completed: number;
}

function TodoCounter({ total, completed }: TodoCounterProps) {
  // Child receives derived values only
  return (
    <h1>
      Completados {completed} de {total}
    </h1>
  );
}

export default function App() {
  // State lives in the parent
  const [todos] = useState<Todo[]>(TODOS);

  // Derived data
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <>
      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />
    </>
  );
}

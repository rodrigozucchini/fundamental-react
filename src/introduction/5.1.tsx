import { useState } from "react";

function App() {
  // State definition
  const [count, setCount] = useState<number>(0);

  // Handler to update state
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default App;